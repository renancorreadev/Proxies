import { Controller, Post, Get, Body, Inject, Logger } from '@nestjs/common';
import { KeycloakAuthService } from '../../Domain/KeycloakAuthenticationService';
import { DependencyInjectionTokens, BaseUrls } from '../../../../helper/AppConstants';
import { KeycloakLoginDTO } from '../../Domain/DTO/HTTPRequest/AuthenticationRequest';
import { ApiTags } from '@nestjs/swagger';

@Controller(BaseUrls.AUTH)
@ApiTags('Auth Keycloak API Endpoint')
export class KeycloakAuthWebAdapter {
	private readonly logger = new Logger(KeycloakAuthWebAdapter.name);

	constructor(
		@Inject(DependencyInjectionTokens.KEYCLOAK_AUTH_SERVICE)
		private readonly keycloakAuthService: KeycloakAuthService,
	) {}

	@Post('/keycloak/login')
	async login(@Body() loginDTO: KeycloakLoginDTO): Promise<{ access_token: string }> {
		try {
			this.logger.log('---------- PROCESS BEGIN ----------');
			this.logger.log('Running AuthenticationKeycloak Web Adapter');
			this.logger.log('Logging in with Keycloak...');

			const response = await this.keycloakAuthService.login(loginDTO);
			this.logger.log(`login response: ${JSON.stringify(response)}`);
			this.logger.log('---------- PROCESS END ----------');
			return response;
		} catch (e) {
			this.logger.log('---------- PROCESS END WITH ERROR ----------');
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in executing login method on application `);
		}
	}

	@Post('/keycloak/logout')
	async logout(@Body() body: { username: string }): Promise<void> {
		try {
			this.logger.log('---------- PROCESS BEGIN ----------');
			this.logger.log('Running AuthenticationKeycloak Web Adapter');
			this.logger.log('Logging out from Keycloak...');
			const response = await this.keycloakAuthService.logout(body.username);
			this.logger.log(`logout response: ${JSON.stringify(response)}`);
			this.logger.log('---------- PROCESS END ----------');
			return response;
		} catch (e) {
			this.logger.log('---------- PROCESS END WITH ERROR ----------');
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in executing logout method on application `);
		}
	}

	@Post('/keycloak/refresh')
	async refresh(@Body('username') username: string): Promise<{ access_token: string; refresh_token?: string }> {
		try {
			this.logger.log('---------- PROCESS BEGIN ----------');
			this.logger.log('Running AuthenticationKeycloak Web Adapter');
			this.logger.log('Refreshing token...');
			const response = await this.keycloakAuthService.refresh(username);
			this.logger.log(`refresh response: ${JSON.stringify(response)}`);
			this.logger.log('---------- PROCESS END ----------');
			return response;
		} catch (e) {
			this.logger.log('---------- PROCESS END WITH ERROR ----------');
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in executing refresh method on application `);
		}
	}
}
