import { Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';

import { ERC20ManagerBlockchainTokenOutputPort } from '../../Port/Output/ERC20ManagerBlockchainTokenOutputPort';
import { GetBalanceRequestDTO } from '../../Domain/Dto/HTTPRequest/get-balance-request-dto';

import { getPrivateKeyFromVault } from '@helper/vault';
import { getUserByEmail } from '@helper/api';

/** Connector Blockchain */
import { ERC20ManagerConnector } from '@helper/blockchain/connector/ERC20ManagerConnector';
config();

@Injectable()
export class ERC20ManagerBlockchainAdapter implements ERC20ManagerBlockchainTokenOutputPort {
	private readonly logger = new Logger('ERC20ManagerBlockchainAdapter');

	async getBalanceDrex(params: GetBalanceRequestDTO): Promise<number> {
		try {
			const { email } = params;
			const privateKey = await getPrivateKeyFromVault(email);
			if (!privateKey) throw new Error('Private key not found in Vault');

			const user = await getUserByEmail(email);

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
}
