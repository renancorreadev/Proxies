import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDtoSwagger {
	@ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ example: 'strongpassword', description: 'The password of the user' })
	@IsNotEmpty()
	password: string;
}
