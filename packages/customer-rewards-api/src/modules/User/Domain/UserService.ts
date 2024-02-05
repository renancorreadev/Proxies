// src/modules/Authentication/Domain/AuthService.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { storePrivateKeyInVault } from '@helper/vault';

import { DependencyInjectionTokens } from 'customer-rewards-api/src/helper/AppConstants';

import { UserTokenUseCase } from '../Port/Input/UserTokenUseCase';
import { UserTokenOutputPort } from '../Port/Output/UserTokenOutputPort';
import { UserInfo, UserUpdater } from './@types/user';

@Injectable()
export class UserService implements UserTokenUseCase {
	private readonly logger = new Logger('UserService');

	constructor(
		@Inject(DependencyInjectionTokens.USER_TOKEN_OUTPUT_PORT)
		private readonly userTokenAdapter: UserTokenOutputPort,
	) {}

	async register(email: string, password: string, isAdmin?: boolean): Promise<any> {
		try {
			if (!password) throw new Error('Password is required');

			const user = await this.userTokenAdapter.register(email, password, isAdmin);

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

	async deleteUser(email: string): Promise<string> {
		try {
			const result = await this.userTokenAdapter.deleteUser(email);

			return result;
		} catch (error) {
			this.logger.error(error);
			throw new Error(error);
		}
	}

	async updateUser(email: string, updatedUserData: UserUpdater): Promise<UserInfo> {
		try {
			return await this.userTokenAdapter.updateUser(email, updatedUserData);
		} catch (error) {
			this.logger.error(error);
			throw new Error(error);
		}
	}

	async getUser(email: string): Promise<UserInfo | undefined> {
		try {
			const user = await this.userTokenAdapter.getUser(email);
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
