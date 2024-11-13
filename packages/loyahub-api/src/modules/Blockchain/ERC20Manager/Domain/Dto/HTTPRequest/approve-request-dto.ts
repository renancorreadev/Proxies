import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApproveDrexRequestDTO {
	@ApiProperty({ type: String, required: true, example: '0x0000000000000000000000000000000000000000' })
	@IsNotEmpty()
	@IsString()
	spender: string;

	@ApiProperty({ type: Number, required: true, example: 1000 })
	@IsNotEmpty()
	@IsNumber()
	amount: number;
}
