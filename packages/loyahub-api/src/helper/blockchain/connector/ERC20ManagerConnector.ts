import { ethers } from 'ethers';
import { ERC20ManagerBlockchainConnector } from '../ERC20ManagerBlockchainConnector';
import { IERC20ManagerConnector } from './interfaces/IERC20ManagerConnector';
import { blockchainConfig } from '../config';
import { Logger } from '@nestjs/common';

export class ERC20ManagerConnector extends ERC20ManagerBlockchainConnector implements IERC20ManagerConnector {
	private readonly logger = new Logger('ERC20ManagerConnector');

	async approve(
		email: string,
		sender: string,
		spender: string,
		value: ethers.BigNumberish,
		signServiceUrl: string,
	): Promise<{ transactionHash: string }> {
		this.logger.log(`Starting approve: email=${email}, spender=${spender}, value=${value}`);
		try {
			const data = this.contract.interface.encodeFunctionData('approve', [spender, value]);
			return await this.signAndSendTransaction(email, sender, data, signServiceUrl);
		} catch (error) {
			this.logger.error(`Error in approve: ${error.message}`, error.stack);
			throw new Error('Failed to approve tokens. Please check the parameters and try again.');
		}
	}

	async transfer(
		email: string,
		sender: string,
		to: string,
		value: ethers.BigNumberish,
		signServiceUrl: string,
	): Promise<{ transactionHash: string }> {
		this.logger.log(`Starting transfer: email=${email}, to=${to}, value=${value}`);
		try {
			const data = this.contract.interface.encodeFunctionData('transfer', [to, value]);
			return await this.signAndSendTransaction(email, sender, data, signServiceUrl);
		} catch (error) {
			this.logger.error(`Error in transfer: ${error.message}`, error.stack);
			throw new Error('Failed to transfer tokens. Please check the parameters and try again.');
		}
	}

	async transferFrom(
		email: string,
		sender: string,
		from: string,
		to: string,
		value: ethers.BigNumberish,
		signServiceUrl: string,
	): Promise<{ transactionHash: string }> {
		this.logger.log(`Starting transferFrom: email=${email}, from=${from}, to=${to}, value=${value}`);
		try {
			const data = this.contract.interface.encodeFunctionData('transferFrom', [from, to, value]);
			return await this.signAndSendTransaction(email, sender, data, signServiceUrl);
		} catch (error) {
			this.logger.error(`Error in transferFrom: ${error.message}`, error.stack);
			throw new Error('Failed to transfer tokens from another account. Check the parameters and try again.');
		}
	}

	async balanceOf(address: string): Promise<number> {
		this.logger.log(`Fetching balance for address: ${address}`);
		try {
			const balance = await this.contract.balanceOf(address);
			this.logger.log(`Balance fetched successfully: ${balance}`);
			return Number(balance);
		} catch (error) {
			this.logger.error(`Error fetching balance: ${error.message}`, error.stack);
			throw new Error('Failed to fetch the balance. Please try again.');
		}
	}

	async mint(
		email: string,
		sender: string,
		to: string,
		value: ethers.BigNumberish,
		signServiceUrl: string,
	): Promise<{ transactionHash: string }> {
		this.logger.log(`Starting mint: email=${email}, to=${to}, value=${value}`);
		try {
			const data = this.contract.interface.encodeFunctionData('mint', [to, value]);
			return await this.signAndSendTransaction(email, sender, data, signServiceUrl);
		} catch (error) {
			this.logger.error(`Error in mint: ${error.message}`, error.stack);
			throw new Error('Failed to mint tokens. Please check the parameters and try again.');
		}
	}

	async getNonce(walletAddress: string): Promise<number> {
		this.logger.log(`Fetching nonce for wallet address: ${walletAddress}`);
		try {
			const nonce = await this.provider.getTransactionCount(walletAddress, 'pending');
			this.logger.log(`Nonce fetched successfully: ${nonce}`);
			return nonce;
		} catch (error) {
			this.logger.error(`Error fetching nonce: ${error.message}`, error.stack);
			throw new Error('Failed to fetch nonce. Ensure the wallet address is correct and try again.');
		}
	}

	private async signAndSendTransaction(
		email: string,
		walletAddress: string,
		data: string,
		signServiceUrl: string,
	): Promise<{ transactionHash: string }> {
		try {
			const nonce = await this.getNonce(walletAddress);

			const transaction = {
				type: '0x0',
				to: this.contract.target,
				gas: ethers.toQuantity(500000),
				gasPrice: ethers.toQuantity(0),
				value: ethers.toQuantity(0),
				chainId: ethers.toQuantity(blockchainConfig.chainID),
				nonce: ethers.toQuantity(nonce),
				data,
			};

			const correctedTransaction = Object.fromEntries(
				Object.entries(transaction).map(([key, value]) => [
					key,
					typeof value === 'string' && value.startsWith('Ox') ? value.replace('Ox', '0x') : value,
				]),
			);

			const signedTx = await this.getSignedTransaction(email, correctedTransaction, signServiceUrl);
			return await this.sendSignedTransaction(signedTx);
		} catch (error) {
			this.logger.error(`Error signing or sending transaction: ${error.message}`, error.stack);
			throw new Error('Failed to sign or send the transaction. Check the logs for more details.');
		}
	}

	private async sendSignedTransaction(signedTransaction: string): Promise<{ transactionHash: string }> {
		this.logger.log(`Sending signed transaction: ${signedTransaction}`);
		try {
			const txResponse = await this.provider.broadcastTransaction(signedTransaction);
			this.logger.log(`Transaction broadcasted, waiting for confirmation...`);
			const receipt = await txResponse.wait();
			this.logger.log(`Transaction confirmed with hash: ${receipt.hash}`);
			return { transactionHash: receipt.hash };
		} catch (error) {
			this.logger.error(`Error sending signed transaction: ${error.message}`, error.stack);
			throw new Error('Failed to send the signed transaction. Check the logs for more details.');
		}
	}

	private async getSignedTransaction(email: string, transaction: any, signServiceUrl: string): Promise<string> {
		this.logger.log(`Requesting signature for email=${email}`);
		const payload = { email, transaction };
		const url = `${signServiceUrl}/wallet/sign`;

		try {
			this.logger.debug(`Payload for signing request: ${JSON.stringify(payload, null, 2)}`);
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error(`Signature service error: ${response.statusText}`);
			}

			const { signedTransaction } = await response.json();
			if (!signedTransaction) {
				throw new Error('No signed transaction returned from the signature service.');
			}

			this.logger.log(`Received signed transaction successfully.`);
			return signedTransaction;
		} catch (error) {
			this.logger.error(`Error requesting signed transaction: ${error.message}`, error.stack);
			throw new Error('Failed to retrieve the signed transaction. Check the logs for more details.');
		}
	}
}
