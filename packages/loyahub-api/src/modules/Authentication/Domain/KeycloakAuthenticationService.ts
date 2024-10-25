import { Injectable, Inject, Logger } from '@nestjs/common';
import { KeycloakTokenOutputPort } from '../Port/Output/AuthenticationKeycloakTokenOutputPort';
import { KeycloakLoginDTO } from './DTO/HTTPRequest/AuthenticationRequest';
import { DependencyInjectionTokens } from '../../../helper/AppConstants';

@Injectable()
export class KeycloakAuthService {
	private readonly logger = new Logger(KeycloakAuthService.name);

	constructor(
		@Inject(DependencyInjectionTokens.KEYCLOAK_TOKEN_OUTPUT_PORT)
		private readonly keycloakAuthAdapter: KeycloakTokenOutputPort,
	) {}

	async login(loginDTO: KeycloakLoginDTO): Promise<{ access_token: string }> {
		return await this.keycloakAuthAdapter.login(loginDTO);
	}

	async logout(username: string): Promise<void> {
		await this.keycloakAuthAdapter.logout(username);
	}

	async refresh(username: string): Promise<{ access_token: string }> {
		return await this.keycloakAuthAdapter.refresh(username);
	}
}
