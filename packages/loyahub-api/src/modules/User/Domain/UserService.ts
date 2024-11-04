import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from 'loyahub-api/src/helper/AppConstants';
import { UserTokenUseCase } from '../Port/Input/UserTokenUseCase';
import { UserTokenOutputPort } from '../Port/Output/UserTokenOutputPort';
import { UserInfo, UserUpdater } from './@types/user';
import { InternalServerError, UserNotFoundError, BadRequestError } from './errors/user.errors';

import { UserRegisterDTORequest } from './DTO/HTTPRequest/userHttpRequest';
import { UserRegisterResponse } from './DTO/HTTPResponse/userHttpResponse';

@Injectable()
export class UserService implements UserTokenUseCase {
	private readonly logger = new Logger('UserService');

	constructor(
		@Inject(DependencyInjectionTokens.USER_TOKEN_OUTPUT_PORT)
		private readonly userTokenAdapter: UserTokenOutputPort,
	) {}

	async register(registerUserDTO: UserRegisterDTORequest): Promise<UserRegisterResponse> {
		try {
			const { email, username, age, password, profileImageUrl, isAdmin, address } = registerUserDTO;
			/** TODO: Validations for requires fields */
			if (!password) throw new BadRequestError('Password is required');
			if (!username) throw new BadRequestError('Username is required');
			if (!email) throw new BadRequestError('Email is required');
			if (!age) throw new BadRequestError('Age is required');
			if (!address) throw new BadRequestError('Address is required');

			if (isAdmin !== undefined && typeof isAdmin !== 'boolean') {
				throw new BadRequestError('isAdmin must be a boolean');
			}

			// Return user data from the adapter output port
			const user = await this.userTokenAdapter.register({
				email: email,
				username: username,
				age: age,
				password: password,
				profileImageUrl: profileImageUrl,
				isAdmin: isAdmin,
				address: address,
			});

			// Return user data registered
			return {
				message: 'Usuário registrado com sucesso',
				user: {
					email: user.email,
					username: user.username,
					walletAddress: user.walletAddress,
					profileImageUrl: user.profileImageUrl,
					isAdmin: user.isAdmin,
					createdAt: user.createdAt,
				},
			};
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerError(error.message);
		}
	}

	async getUser(email: string): Promise<UserInfo | undefined> {
		try {
			const user = await this.userTokenAdapter.getUser(email);
			if (!user) throw new UserNotFoundError('User not found');
			return user;
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerError(error.message);
		}
	}

	async deleteUser(email: string): Promise<string> {
		try {
			return await this.userTokenAdapter.deleteUser(email);
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerError(error.message);
		}
	}

	async updateUser(email: string, updatedUserData: UserUpdater): Promise<UserInfo> {
		try {
			return await this.userTokenAdapter.updateUser(email, updatedUserData);
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerError(error.message);
		}
	}
}
