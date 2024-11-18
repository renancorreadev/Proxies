import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransferDrexRequestDTO {
	@ApiProperty({ type: String, required: true, example: 'test@test.com', description: 'Email do usuário' })
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty({
		type: String,
		required: true,
		example: '0x0000000000000000000000000000000000000000',
		description: 'Endereço de destino',
	})
	@IsNotEmpty()
	@IsString()
	to: string;

	@ApiProperty({
		type: Number,
		required: true,
		example: 1000,
		description: 'Quantidade de token a ser transferido',
	})
	@IsNotEmpty()
	@IsNumber()
	amount: number;
}
