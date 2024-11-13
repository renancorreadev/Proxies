import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from 'loyahub-api/src/helper/AppConstants';
import { ERC20ManagerBlockchainTokenUseCase } from '../Port/Input/ERC20ManagerBlockchainTokenUseCase';
import { GetBalanceRequestDTO } from './Dto/HTTPRequest/get-balance-request-dto';
import { ERC20ManagerBlockchainTokenOutputPort } from '../Port/Output/ERC20ManagerBlockchainTokenOutputPort';

@Injectable()
export class ERC20ManagerBlockchainService implements ERC20ManagerBlockchainTokenUseCase {
	private readonly logger = new Logger('ERC20ManagerBlockchainService');

	constructor(
		@Inject(DependencyInjectionTokens.ERC20_MANAGER_BLOCKCHAIN_TOKEN_OUTPUT_PORT)
		private readonly erc20ManagerBlockchainTokenAdapter: ERC20ManagerBlockchainTokenOutputPort,
	) {}

	/// @dev GETTERS
	async getBalanceDrex(params: GetBalanceRequestDTO): Promise<number> {
		try {
			const { email } = params;
			this.logger.log(`Fetching Drex balance for user: ${email}`);
			return await this.erc20ManagerBlockchainTokenAdapter.getBalanceDrex(params);
		} catch (e) {
			this.logger.error(`Error in ERC20ManagerBlockchainService: ${JSON.stringify(e)}`);
			throw new Error('An error occurred while getting the Drex balance');
		}
	}
}
