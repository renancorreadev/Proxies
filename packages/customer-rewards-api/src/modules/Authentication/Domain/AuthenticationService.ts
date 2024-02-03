// src/modules/Authentication/Domain/AuthService.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { storePrivateKeyInVault } from '@helper/vault';

import { DependencyInjectionTokens } from 'customer-rewards-api/src/helper/AppConstants';
import { AuthenticationTokenUseCase } from '../Port/Input/AuthenticationTokenUseCase';
import { AuthenticationTokenOutputPort, UserData, UserInfo } from '../Port/Output/AuthenticationTokenOutputPort';
import { LoginDTO } from './DTO/HTTPRequest/AuthenticationRequest';
import { UserEntity } from '../Adapters/Output/db/UserEntity';

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

	async deleteUser(email: string): Promise<string> {
		try {
			const result = await this.authenticationTokenAdapter.deleteUser(email);

			return result;
		} catch (error) {
			this.logger.error(error);
			throw new Error(error);
		}
	}

	async updateUser(email: string, updatedUserData: Partial<UserEntity>): Promise<UserEntity> {
		try {
			return await this.authenticationTokenAdapter.updateUser(email, updatedUserData);
		} catch (error) {
			this.logger.error(error);
			throw new Error(error);
		}
	}

	async getUser(email: string): Promise<UserInfo | undefined> {
		try {
			const user = await this.authenticationTokenAdapter.getUser(email);
			if (!user) {
				this.logger.error('User not found');
				throw new Error('User not found');
			}
			return user;
		} catch (error) {
			this.logger.error(error);
			throw new Error(error);
		}
	}
}
