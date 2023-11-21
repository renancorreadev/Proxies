import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetUniqueNFTResponse {
	@ApiProperty({ type: Number, required: true, example: 100 })
	@IsNotEmpty()
	@IsNumber()
	nftQuantity: number;
}
