// src/modules/Authentication/Adapters/Output/AuthenticationAdapter.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../Output/db/UserEntity';
import { UserTokenOutputPort } from '../../Port/Output/UserTokenOutputPort';

import * as bcrypt from 'bcrypt';
import { DependencyInjectionTokens } from '../../../../helper/AppConstants';
import { WalletCreator } from '@helper/walletCreator';

import { UserData, UserInfo, UserUpdater } from '../../Domain/@types/user';

@Injectable()
export class UserAdapter implements UserTokenOutputPort {
	constructor(@Inject(DependencyInjectionTokens.DATA_SOURCE) private dataSource: DataSource) {}

	private userRepository: Repository<UserEntity> = this.dataSource.getRepository(UserEntity);

	async register(email: string, password: string, isAdmin?: boolean): Promise<UserData> {
		if (!password) throw new Error('Password is required');
		const hashedPassword = await bcrypt.hash(password, 10);

		const walletCreator = new WalletCreator();
		const { walletAddress, privateKey } = walletCreator.createNewEthereumWallet();

		if (!walletAddress || !privateKey) throw new Error('Failed to create a new Ethereum wallet.');

		const newUser = this.userRepository.create({
			email,
			password: hashedPassword,
			walletAddress: walletAddress,
			isAdmin,
		});

		await this.userRepository.save(newUser);

		const userCreated = {
			...newUser,
			privateKey: privateKey,
		};

		return userCreated;
	}

	async getUser(email: string): Promise<UserInfo | undefined> {
		const user = await this.userRepository.findOne({
			select: ['id', 'email', 'walletAddress', 'isAdmin', 'createdAt', 'updatedAt'],
			where: { email },
		});

		return user ? user : undefined;
	}

	async deleteUser(email: string): Promise<string> {
		const user = await this.userRepository.findOne({
			where: { email },
		});
		if (!user) {
			throw new NotFoundException('User not found');
		}

		const result = await this.userRepository.delete({ id: user.id });

		return result.affected === 1 ? 'User deleted successfully' : 'User not found';
	}

	async updateUser(email: string, updatedUserData: UserUpdater): Promise<UserData> {
		const user = await this.userRepository.findOne({
			where: { email },
		});
		if (!user) {
			throw new NotFoundException('User not found');
		}

		// List of fields that can be updated
		const allowedUpdates = ['email', 'walletAddress', 'isAdmin'];

		// Updating the user object with the new data
		allowedUpdates.forEach((field) => {
			if (field in updatedUserData) {
				user[field] = updatedUserData[field];
			}
		});

		await this.userRepository.save(user);

		return user;
	}
}
