import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsNumber, IsString } from 'class-validator';
import { UserData } from '../../@types/user';

export class GetUserResponseSwagger {
	@ApiProperty({ example: 2 })
	@IsNumber()
	id: number;

	@ApiProperty({ example: 'anton@gmail.com' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: '0x87952c8E08e6E2A0C8A8d8ce7c5910D0353BD830' })
	@IsString()
	walletAddress: string;

	@ApiProperty({ example: false })
	@IsBoolean()
	isAdmin: boolean;

	@ApiProperty({ example: '2024-02-04T00:05:07.652Z' })
	@IsDateString()
	createdAt: Date;

	@ApiProperty({ example: '2024-02-04T00:05:07.652Z' })
	@IsDateString()
	updatedAt: Date;

	constructor(userData: UserData) {
		this.id = userData.id;
		this.email = userData.email;
		this.walletAddress = userData.walletAddress;
		this.isAdmin = userData.isAdmin;
		this.createdAt = new Date(userData.createdAt);
		this.updatedAt = new Date(userData.updatedAt);
	}
}
