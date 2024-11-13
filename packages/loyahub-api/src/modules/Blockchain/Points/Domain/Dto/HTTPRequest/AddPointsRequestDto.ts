import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

export class RemovePointsRequestDTO {
	@ApiProperty({ type: Number, required: true, example: 1 })
	@IsNotEmpty()
	@IsNumber()
	clientId: number;

	@ApiProperty({ type: Number, required: true, example: 100 })
	@IsNotEmpty()
	@IsNumber()
	points: number;
}

export class SetDrexAddressRequestDTO {
	@ApiProperty({ type: Number, required: true, example: '0x640c974A4d1cF06d9b0c15669c50eE1D62fA7C14' })
	@IsNotEmpty()
	@IsString()
	newAddress: string;
}
