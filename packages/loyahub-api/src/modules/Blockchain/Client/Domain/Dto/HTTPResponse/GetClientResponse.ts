import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { LocationResponse } from './LocationResponse';

export class GetClientResponse {
	@ApiProperty({ type: String, required: true, example: 'Renan' })
	@IsString()
	name: string;

	@ApiProperty({ type: Number, required: true, example: 30 })
	@IsNumber()
	age: number;

	@ApiProperty({ type: String, required: true, example: '0x0000000000000000000000000000000000000000' })
	@IsString()
	walletAddress: string;

	@ApiProperty({ type: Number, required: true, example: 1 })
	@IsNumber()
	paymentStatus: number;

	@ApiProperty({ type: LocationResponse, required: true })
	address: LocationResponse;
}
