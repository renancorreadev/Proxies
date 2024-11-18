import { Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';

import { ERC20ManagerBlockchainTokenOutputPort } from '../../Port/Output/ERC20ManagerBlockchainTokenOutputPort';
import { GetBalanceRequestDTO } from '../../Domain/Dto/HTTPRequest/get-balance-request-dto';

import { getPrivateKeyFromVault } from '@helper/vault';
import { getUserByEmail } from '@helper/api';

/** Connector Blockchain */
import { ERC20ManagerConnector } from '@helper/blockchain/connector/ERC20ManagerConnector';
import { ApproveDrexRequestDTO } from '../../Domain/Dto/HTTPRequest/approve-request-dto';
import { TransferDrexRequestDTO } from '../../Domain/Dto/HTTPRequest/transfer-request-dto';
config();

@Injectable()
export class ERC20ManagerBlockchainAdapter implements ERC20ManagerBlockchainTokenOutputPort {
	private readonly logger = new Logger('ERC20ManagerBlockchainAdapter');

	async getBalanceDrex(params: GetBalanceRequestDTO): Promise<number> {
		try {
			const { email } = params;
			const privateKey = await getPrivateKeyFromVault(email);
			console.log('privateKey', privateKey);
			if (!privateKey) throw new Error('Private key not found in Vault');

			const user = await getUserByEmail(email);
			console.log('user', user);
			const { ERC20_CONTRACT_ADDRESS, PROVIDER } = process.env;
			if (!ERC20_CONTRACT_ADDRESS || !PROVIDER) {
				throw new Error('Missing required environment variables');
			}

			const drexContractInstance = new ERC20ManagerConnector(ERC20_CONTRACT_ADDRESS, PROVIDER, privateKey);

			return await drexContractInstance.balanceOf({ address: user.data.walletAddress });
		} catch (error) {
			this.logger.error(`Error: ${JSON.stringify(error.message || error)}`);
			throw new Error('An error occurred in the balanceOf function on the blockchain');
		}
	}

	/**
	 * This function approves a specified amount of Drex tokens to be spent by a specified spender.
	 *
	 * @param {ApproveDrexRequestDTO} params - The parameters required to approve Drex tokens.
	 * @param {number} params.amount - The amount of Drex tokens to approve.
	 * @param {string} params.spender - The address of the spender who is approved to spend the tokens.
	 *
	 * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean indicating whether the approval was successful.
	 *
	 * @throws {Error} - Throws an error if there is an issue with the approval process.
	 */
	async approveDrex(params: ApproveDrexRequestDTO): Promise<boolean> {
		try {
			const { amount, spender } = params;

			const { ERC20_CONTRACT_ADDRESS, PROVIDER, PRIVATE_KEY } = process.env;
			if (!ERC20_CONTRACT_ADDRESS || !PROVIDER) {
				throw new Error('Missing required environment variables');
			}

			const drexContractInstance = new ERC20ManagerConnector(ERC20_CONTRACT_ADDRESS, PROVIDER, PRIVATE_KEY);

			const { hash } = await drexContractInstance.approve({ spender, amount });

			return !!hash;
		} catch (error) {
			this.logger.error(`Error: ${JSON.stringify(error.message || error)}`);
			throw new Error('An error occurred in the approve function on the blockchain');
		}
	}

	async transferDrex(params: TransferDrexRequestDTO): Promise<string> {
		const { email, to, amount } = params;
		const { ERC20_CONTRACT_ADDRESS, PROVIDER, PRIVATE_KEY } = process.env;

		if (!ERC20_CONTRACT_ADDRESS || !PROVIDER || !PRIVATE_KEY) {
			throw new Error('Missing required environment variables');
		}

		const privateKey = await getPrivateKeyFromVault(email);

		if (!privateKey) throw new Error('Private key not found in Vault');

		const drexContractInstance = new ERC20ManagerConnector(ERC20_CONTRACT_ADDRESS, PROVIDER, privateKey);

		const { hash } = await drexContractInstance.transfer({ to, amount });

		return hash;
	}
	catch(error) {
		this.logger.error(`Error: ${JSON.stringify(error.message || error)}`);
		throw new Error('An error occurred in the transfer function on the blockchain');
	}
}
