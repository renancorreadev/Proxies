import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from '@src/helper/AppConstants';
import { ClientBlockchainTokenUseCase } from '../Port/Input/ClientBlockchainTokenUseCase';
import { ClientBlockchainTokenOutputPort } from '../Port/Output/ClientBlockchainTokenOutputPort';
import { RegisterClientRequestDto } from './Dto/HTTPRequest/ClientBlockchainRequestDto';

@Injectable()
export class ClientBlockchainService implements ClientBlockchainTokenUseCase {
	private readonly logger = new Logger('ClientBlockchainService');
	constructor(
		@Inject(DependencyInjectionTokens.CLIENTBLOCKCHAIN_TOKEN_OUTPUT_PORT)
		private readonly clientBlockchainTokenAdapter: ClientBlockchainTokenOutputPort,
	) {}
	async registerClient(RegisterClientRequestDto: RegisterClientRequestDto): Promise<any> {
		try {
		
			await this.clientBlockchainTokenAdapter.registerClient(RegisterClientRequestDto);

			return 'Cliente registrado com sucesso!';
		} catch (e) {
			this.logger.error(`Error in Authorization Service: ${JSON.stringify(e)}`);
			throw new Error('An error ocurred while creating authorization token');
		}
	}
}
