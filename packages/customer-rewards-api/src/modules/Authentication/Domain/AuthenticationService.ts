// src/modules/Authentication/Domain/AuthService.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { DependencyInjectionTokens } from 'customer-rewards-api/src/helper/AppConstants';
import { AuthenticationTokenUseCase } from '../Port/Input/AuthenticationTokenUseCase';
import { AuthenticationTokenOutputPort } from '../Port/Output/AuthenticationTokenOutputPort';
import { LoginDTO } from './DTO/HTTPRequest/AuthenticationRequest';
import { storePrivateKeyInVault } from '@helper/vault';

@Injectable()
export class AuthenticationService implements AuthenticationTokenUseCase {
	private readonly logger = new Logger('AuthenticationService');

	constructor(
		@Inject(DependencyInjectionTokens.AUTH_TOKEN_OUTPUT_PORT)
		private readonly authenticationTokenAdapter: AuthenticationTokenOutputPort,
	) {}

	async register(email: string, password: string): Promise<any> {
		try {
			if (!password) throw new Error('Password is required');

			const user = await this.authenticationTokenAdapter.register(email, password);

			// Store in vault
			if (user && user.id) {
				try {
					const resultStore = await storePrivateKeyInVault(email, user.privateKey);

					const response = {
						message: resultStore,
					};

					return response;
				} catch (error) {
					this.logger.error(error);
					throw new Error(error);
				}
			}

			return user;
		} catch (error) {
			this.logger.error(error);
			throw new Error(error);
		}
	}

	async login(loginDTO: LoginDTO): Promise<{ access_token: string }> {
		try {
			return await this.authenticationTokenAdapter.login(loginDTO);
		} catch (error) {
			this.logger.error(error);
			throw new Error(error);
		}
	}

	async validateUser(payload: any): Promise<any> {
		try {
			return await this.authenticationTokenAdapter.validateUser(payload);
		} catch (error) {
			this.logger.error(error);
			throw new Error(error);
		}
	}
}
