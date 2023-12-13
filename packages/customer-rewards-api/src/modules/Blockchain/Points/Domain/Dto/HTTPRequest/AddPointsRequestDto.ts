import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddPointsRequestDto {
	@ApiProperty({ type: Number, required: true, example: 1 })
	@IsNotEmpty()
	@IsNumber()
	clientId: number;

	@ApiProperty({ type: Number, required: true, example: 100 })
	@IsNotEmpty()
	@IsNumber()
	points: number;
}
