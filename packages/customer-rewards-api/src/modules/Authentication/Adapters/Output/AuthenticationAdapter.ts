import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AuthenticationTokenOutputPort } from '../../Port/Output/AuthenticationTokenOutputPort';
import { LoginDTO } from '../../Domain/DTO/HTTPRequest/AuthenticationRequest';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DependencyInjectionTokens } from '../../../../helper/AppConstants';
import { UserEntity } from '@user/Adapters/Output/db/UserEntity';

@Injectable()
export class AuthenticationAdapter implements AuthenticationTokenOutputPort {
	constructor(
		@Inject(DependencyInjectionTokens.DATA_SOURCE) private dataSource: DataSource,
		private jwtService: JwtService,
	) {}

	private userRepository: Repository<UserEntity> = this.dataSource.getRepository(UserEntity);

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
	async validateUser(payload: any): Promise<any> {
		return await this.userRepository.findOneBy({ id: payload.sub });
	}
}
