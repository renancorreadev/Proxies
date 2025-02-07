import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetBalanceRequestDTO {
	@ApiProperty({ type: String, required: true, example: 'email@email.com' })
	@IsNotEmpty()
	@IsString()
	email: string;
}
