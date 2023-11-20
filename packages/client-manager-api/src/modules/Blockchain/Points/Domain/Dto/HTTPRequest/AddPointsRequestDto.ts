import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddPointsRequestDto {
	@ApiProperty({ type: Number, required: true, example: 1 })
	@IsNotEmpty()
	@IsNumber()
	clientID: number;

	@ApiProperty({ type: Number, required: true, example: 100 })
	@IsNotEmpty()
	@IsNumber()
	points: number;
}
