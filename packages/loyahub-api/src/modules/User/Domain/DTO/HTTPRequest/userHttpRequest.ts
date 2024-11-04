import { AddressLocalDto } from '@/src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserRegisterDTORequest {
	@ApiProperty({ example: 'user@example.com', description: 'The email of the user', required: true })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ example: 'username', description: 'The username of the user', required: true })
	@IsNotEmpty()
	username: string;

	@ApiProperty({ example: 'strongpassword', description: 'The password of the user', required: true })
	@IsNotEmpty()
	password: string;

	@ApiProperty({ example: '/image/file.png', description: 'The profile image url', required: false })
	@IsOptional()
	@IsNotEmpty()
	profileImageUrl?: string;

	@ApiProperty({ example: 'age', description: 'The age of the user', required: true })
	@IsNotEmpty()
	age: number;

	@ApiProperty({ example: 'true', description: 'Whether the user is an admin or not', required: false })
	@IsOptional()
	@IsBoolean()
	isAdmin?: boolean;

	@ApiProperty({ type: AddressLocalDto, required: true })
	@IsNotEmpty()
	address: AddressLocalDto;
}
