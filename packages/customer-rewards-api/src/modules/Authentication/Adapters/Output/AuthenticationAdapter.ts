// src/modules/Authentication/Adapters/Output/AuthenticationAdapter.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../Output/db/UserEntity';
import { AuthenticationTokenOutputPort, UserData, UserInfo } from '../../Port/Output/AuthenticationTokenOutputPort';
import { LoginDTO } from '../../Domain/DTO/HTTPRequest/AuthenticationRequest';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DependencyInjectionTokens } from '../../../../helper/AppConstants';
import { WalletCreator } from '@helper/walletCreator';

@Injectable()
export class AuthenticationAdapter implements AuthenticationTokenOutputPort {
	constructor(
		@Inject(DependencyInjectionTokens.DATA_SOURCE) private dataSource: DataSource,
		private jwtService: JwtService,
	) {}

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

	async login(loginDTO: LoginDTO): Promise<{ access_token: string }> {
		const user = await this.userRepository.findOneBy({ email: loginDTO.email });

		if (!user) throw new Error('User not found');
		if (!loginDTO.password) throw new Error('Password is required');

		const isMatch = await bcrypt.compare(loginDTO.password, user.password);

		if (!isMatch) throw new Error('Invalid credentials');

		const payload = { email: user.email, sub: user.id };
		const access_token = this.jwtService.sign(payload);
		return { access_token };
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

	async updateUser(email: string, updatedUserData: Partial<UserEntity>): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			where: { email },
		});
		if (!user) {
			throw new NotFoundException('User not found');
		}

		Object.assign(user, updatedUserData);

		await this.userRepository.save(user);

		return user;
	}

	async validateUser(payload: any): Promise<any> {
		return await this.userRepository.findOneBy({ id: payload.sub });
	}

	async getUser(email: string): Promise<UserInfo | undefined> {
		const user = await this.userRepository.findOne({
			select: ['id', 'email', 'walletAddress', 'isAdmin', 'createdAt', 'updatedAt'],
			where: { email },
		});

		return user ? user : undefined;
	}
}
