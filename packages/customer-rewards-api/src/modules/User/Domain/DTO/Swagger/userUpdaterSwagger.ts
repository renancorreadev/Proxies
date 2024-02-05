import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { UserUpdater } from '../../@types/user';

export class UserUpdateSwagger {
	@ApiProperty({ example: 'anton@gmail.com' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: '0x87952c8E08e6E2A0C8A8d8ce7c5910D0353BD830' })
	@IsString()
	walletAddress: string;

	@ApiProperty({ example: 'false' })
	@IsBoolean()
	isAdmin: boolean;

	constructor(userData: UserUpdater) {
		this.email = userData.email;
		this.walletAddress = userData.walletAddress;
		this.isAdmin = userData.isAdmin;
	}
}
