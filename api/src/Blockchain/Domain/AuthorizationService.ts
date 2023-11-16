import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from '@src/helper/AppConstants';
import { AuthorizationTokenUseCase } from '../Port/Input/AuthorizationTokenUseCase';
import { AuthorizationTokenOutputPort } from '../Port/Output/AuthorizationTokenOutputPort';
import { AuthorizationRequestDto } from './Dto/RequestsDtos/AuthorizationRequestDto';

@Injectable()
export class AuthorizationService implements AuthorizationTokenUseCase {
	private readonly logger = new Logger('AuthorizationService');
	constructor(
		@Inject(DependencyInjectionTokens.AUTHORIZATION_TOKEN_OUTPUT_PORT)
		private readonly authorizationTokenAdapter: AuthorizationTokenOutputPort,
	) {}
	async createAuthorizationToken(authorizationRequestDto: AuthorizationRequestDto): Promise<string> {
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
