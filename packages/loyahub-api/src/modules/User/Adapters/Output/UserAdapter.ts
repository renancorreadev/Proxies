// src/modules/Authentication/Adapters/Output/AuthenticationAdapter.ts
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './db/UserEntity';
import { UserTokenOutputPort } from '../../Port/Output/UserTokenOutputPort';
import * as bcrypt from 'bcrypt';
import { DependencyInjectionTokens } from '../../../../helper/AppConstants';
import { WalletCreator } from '@helper/walletCreator';
import { UserData, UserInfo, UserUpdater } from '../../Domain/@types/user';
import { storePrivateKeyInVault } from '@helper/vault';
import { InternalServerError, UserNotFoundError } from '../../Domain/errors/user.errors';
import { UserRegisterDTORequest } from '../../Domain/DTO/HTTPRequest/userHttpRequest';

@Injectable()
export class UserAdapter implements UserTokenOutputPort {
	constructor(@Inject(DependencyInjectionTokens.DATA_SOURCE) private readonly dataSource: DataSource) {}

	private readonly userRepository: Repository<UserEntity> = this.dataSource.getRepository(UserEntity);

	/**
	 *
	 * @param registerUserDTO
	 * @returns: Promise<UserData>
	 *
	 */
	async register(registerUserDTO: UserRegisterDTORequest): Promise<UserData> {
		const { email, username, password, profileImageUrl, isAdmin } = registerUserDTO;
		if (!password) throw new InternalServerError('Password is required');
		if (!username) throw new InternalServerError('Username is required');
		if (!email) throw new InternalServerError('Email is required');

		const hashedPassword = await bcrypt.hash(password, 10);
		// 1. Create a new Ethereum wallet
		const walletCreator = new WalletCreator();
		const { walletAddress, privateKey } = walletCreator.createNewEthereumWallet();

		if (!walletAddress || !privateKey) throw new InternalServerError('Failed to create a new Ethereum wallet.');

		const newUser = this.userRepository.create({
			email: email,
			username: username,
			password: hashedPassword,
			profileImageUrl: profileImageUrl,
			walletAddress: walletAddress,
			isAdmin: isAdmin,
		});
		// 2. Save the new user in the database
		await this.userRepository.save(newUser);
		// 3. Store the private key in the vault
		await storePrivateKeyInVault(email, privateKey);

		const userCreated = {
			...newUser,
			privateKey: privateKey,
		};

		return userCreated;
	}

	async getUser(email: string): Promise<UserInfo | undefined> {
		const user = await this.userRepository.findOne({
			select: ['id', 'email', 'username', 'profileImageUrl', 'walletAddress', 'isAdmin', 'createdAt', 'updatedAt'],
			where: { email },
		});

		return user ? user : undefined;
	}

	async deleteUser(email: string): Promise<string> {
		const user = await this.userRepository.findOne({ where: { email } });
		if (!user) throw new UserNotFoundError('User not found');

		const result = await this.userRepository.delete({ id: user.id });
		return result.affected === 1 ? 'User deleted successfully' : 'User not found';
	}

	async updateUser(email: string, updatedUserData: UserUpdater): Promise<UserData> {
		const user = await this.userRepository.findOne({ where: { email } });
		if (!user) throw new UserNotFoundError('User not found');

		const allowedUpdates = ['email', 'walletAddress', 'isAdmin'];
		allowedUpdates.forEach((field) => {
			if (field in updatedUserData) user[field] = updatedUserData[field];
		});

		await this.userRepository.save(user);
		return user;
	}
}
