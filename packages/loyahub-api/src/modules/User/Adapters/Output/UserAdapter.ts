// src/modules/Authentication/Adapters/Output/AuthenticationAdapter.ts
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './db/UserEntity';
import * as bcrypt from 'bcrypt';
import { InternalServerError, UserNotFoundError } from '../../Domain/errors/user.errors';
import { UserRegisterDTORequest } from '../../Domain/DTO/HTTPRequest/userHttpRequest';

import { UserData, UserInfo, UserUpdater } from '../../Domain/@types/user';
import { RegisterClientRequestDto } from '@/src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';
import { AddressLocal } from '@helper/blockchain/types/contracts/client-manager-types';
import axios from 'axios';
import { DependencyInjectionTokens } from '@helper/AppConstants';

import { walletEngineAPI } from '@/src/helper/api';
@Injectable()
export class UserAdapter {
	constructor(@Inject(DependencyInjectionTokens.DATA_SOURCE) private readonly dataSource: DataSource) {}

	private readonly userRepository: Repository<UserEntity> = this.dataSource.getRepository(UserEntity);

	async register(registerUserDTO: UserRegisterDTORequest): Promise<UserData> {
		const { email, username, age, password, profileImageUrl, isAdmin, address } = registerUserDTO;
		if (!password) throw new InternalServerError('Password is required');
		if (!username) throw new InternalServerError('Username is required');
		if (!email) throw new InternalServerError('Email is required');

		const hashedPassword = await bcrypt.hash(password, 10);

		// 1. Cria uma nova wallet usando o serviço wallet-engine
		const walletResponse = await this.createWalletFromEngine(email);
		const { walletAddress } = walletResponse;
		if (!walletAddress) throw new InternalServerError('Failed to create a new Ethereum wallet.');

		const newUser = this.userRepository.create({
			email,
			username,
			password: hashedPassword,
			profileImageUrl,
			walletAddress,
			address: {
				Street: address.Street,
				City: address.City,
				PostalCode: address.PostalCode,
				HouseNumber: address.HouseNumber,
			},
			isAdmin,
		});

		// 2. Salva o novo usuário no banco de dados
		await this.userRepository.save(newUser);

		// 3. Registra o cliente na blockchain
		await this.registerClient({
			name: username,
			age,
			walletAddress,
			paymentStatus: 0,
			address,
		});

		return newUser;
	}

	async getUser(email: string): Promise<UserInfo | undefined> {
		const user = await this.userRepository.findOne({
			select: [
				'id',
				'email',
				'username',
				'profileImageUrl',
				'walletAddress',
				'isAdmin',
				'createdAt',
				'updatedAt',
				'age',
				'address',
				'paymentStatus',
			],
			where: { email },
		});

		if (!user) return undefined;

		return user;
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

	private async registerClient(registerClientBlockchainDto: RegisterClientRequestDto): Promise<string> {
		try {
			const { name, age, walletAddress, paymentStatus, address } = registerClientBlockchainDto;

			const addressPayload: AddressLocal = {
				City: address.City,
				Street: address.Street,
				PostalCode: Number(address.PostalCode),
				HouseNumber: Number(address.HouseNumber),
			};

			const payload = {
				name,
				age,
				walletAddress,
				paymentStatus,
				address: addressPayload,
			};

			const config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: `${process.env.BASE_URL}/api/v1/client/new`,
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json',
				},
				data: JSON.stringify(payload),
			};

			const response = await axios.request(config);
			return response.data;
		} catch (error) {
			console.error('Erro ao registrar cliente na blockchain:', error);
			throw new Error('An error occurred in write contract registerClient function on blockchain');
		}
	}
	private async createWalletFromEngine(email: string): Promise<{ walletAddress: string }> {
		try {
			const payload = { email };
			const response = await walletEngineAPI.post(`/wallet/create`, payload, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response?.data?.address) {
				return { walletAddress: response.data.address };
			} else {
				throw new Error('Invalid response from wallet engine');
			}
		} catch (error) {
			console.error('Erro ao criar wallet usando o wallet engine:', error);
			throw new InternalServerError('Failed to create wallet using wallet engine');
		}
	}
}
