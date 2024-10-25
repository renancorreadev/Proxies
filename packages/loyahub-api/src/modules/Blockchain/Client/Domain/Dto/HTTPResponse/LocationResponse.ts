import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LocationResponse {
	@ApiProperty({ type: String, required: true, example: 'Sao Paulo' })
	@IsNotEmpty()
	@IsString()
	City: string;

	@ApiProperty({ type: String, required: true, example: 'Avenida 233' })
	@IsNotEmpty()
	@IsString()
	Street: string;

	@ApiProperty({ type: Number, required: true, example: '5454411' })
	@IsNotEmpty()
	@IsNumber()
	PostalCode: number;

	@ApiProperty({ type: String, required: true, example: '15' })
	@IsNotEmpty()
	@IsString()
	HouseNumber: string;
}
