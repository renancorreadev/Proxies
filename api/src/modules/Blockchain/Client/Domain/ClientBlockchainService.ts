import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from '@src/helper/AppConstants';
import { ClientBlockchainTokenUseCase } from '../Port/Input/ClientBlockchainTokenUseCase';
import { ClientBlockchainTokenOutputPort } from '../Port/Output/ClientBlockchainTokenOutputPort';
import { ClientBlockchainRequestDto } from './Dto/HTTPRequest/ClientBlockchainRequestDto';

@Injectable()
export class ClientBlockchainService implements ClientBlockchainTokenUseCase {
	private readonly logger = new Logger('ClientBlockchainService');
	constructor(
		@Inject(DependencyInjectionTokens.AUTHORIZATION_TOKEN_OUTPUT_PORT)
		private readonly authorizationTokenAdapter: ClientBlockchainTokenOutputPort,
	) {}
	async createAuthorizationToken(authorizationRequestDto: ClientBlockchainRequestDto): Promise<string> {
		try {
			// const accreditorHosts = nodesAccreditorHosts(authorizationRequestDto.accreditorName, authorizationRequestDto);

			// this.authorizationTokenAdapter.init(accreditorHosts.host, authorizationRequestDto.accreditorName);

			// await this.authorizationTokenAdapter.createAuthorizationToken(authorizationRequestDto);

			return 'Token de Authorization Mintado com Sucesso!';
		} catch (e) {
			this.logger.error(`Error in Authorization Service: ${JSON.stringify(e)}`);
			throw new Error('An error ocurred while creating authorization token');
		}
	}
}
