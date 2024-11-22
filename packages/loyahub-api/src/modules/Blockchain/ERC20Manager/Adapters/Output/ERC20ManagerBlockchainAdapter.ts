import { Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';

import { ERC20ManagerBlockchainTokenOutputPort } from '../../Port/Output/ERC20ManagerBlockchainTokenOutputPort';
import { GetBalanceRequestDTO } from '../../Domain/Dto/HTTPRequest/get-balance-request-dto';

import { getUserByEmail } from '@helper/api';
import { ApproveDrexRequestDTO } from '../../Domain/Dto/HTTPRequest/approve-request-dto';
import { TransferDrexRequestDTO } from '../../Domain/Dto/HTTPRequest/transfer-request-dto';

import { parseUnits } from 'ethers';
import { ERC20ManagerConnector } from '@helper/blockchain/connector/ERC20ManagerConnector';

config();

@Injectable()
export class ERC20ManagerBlockchainAdapter implements ERC20ManagerBlockchainTokenOutputPort {
	private readonly logger = new Logger('ERC20ManagerBlockchainAdapter');
	private readonly walletEngineAPI = `${process.env.SIGN_SERVICE_API}`;
	private readonly provider = process.env.PROVIDER;
	private readonly contractAddress = process.env.ERC20_CONTRACT_ADDRESS;

	private getConnector(): ERC20ManagerConnector {
		if (!this.contractAddress || !this.provider) {
			throw new Error('Missing required environment variables: PROVIDER or ERC20_CONTRACT_ADDRESS');
		}
		return new ERC20ManagerConnector(this.contractAddress, this.provider);
	}

	async getBalanceDrex(params: GetBalanceRequestDTO): Promise<number> {
		try {
			const { email } = params;
			const user = await getUserByEmail(email);
			const walletAddress = user.data.walletAddress;

			if (!walletAddress) {
				throw new Error('Wallet address not found for the user');
			}

			const connector = this.getConnector();

			return await connector.balanceOf(walletAddress);
		} catch (error) {
			this.logger.error(`Error getting Drex balance: ${error.message || error}`);
			throw new Error('An error occurred while fetching the Drex balance.');
		}
	}

	async approveDrex(params: ApproveDrexRequestDTO): Promise<boolean> {
		try {
			const { email, sender, spender, amount } = params;
			const connector = this.getConnector();

			const value = parseUnits(amount.toString(), 18);
			const { transactionHash } = await connector.approve(email, sender, spender, value, this.walletEngineAPI);

			this.logger.log(`Approve transaction successful: ${transactionHash}`);
			return true;
		} catch (error) {
			this.logger.error(`Error approving Drex: ${error.message || error}`);
			throw new Error('An error occurred while approving Drex.');
		}
	}

	async transferDrex(params: TransferDrexRequestDTO): Promise<string> {
		try {
			const { email, sender, to, amount } = params;
			const connector = this.getConnector();

			const value = parseUnits(amount.toString(), 18);
			const { transactionHash } = await connector.transfer(email, sender, to, value, this.walletEngineAPI);

			this.logger.log(`Transfer transaction successful: ${transactionHash}`);
			return transactionHash;
		} catch (error) {
			this.logger.error(`Error transferring Drex: ${error.message || error}`);
			throw new Error('An error occurred while transferring Drex.');
		}
	}
}
