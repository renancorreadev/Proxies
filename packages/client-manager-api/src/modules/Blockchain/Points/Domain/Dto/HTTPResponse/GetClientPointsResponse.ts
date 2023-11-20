import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetClientPointsResponse {
	@ApiProperty({ type: Number, required: true, example: 100 })
	@IsNotEmpty()
	@IsNumber()
	points: number;
}
