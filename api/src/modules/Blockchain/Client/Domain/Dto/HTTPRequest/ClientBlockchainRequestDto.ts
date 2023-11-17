import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ClientBlockchainRequestDto {
	@ApiProperty({ type: 'string', required: true, description: 'Accreditor Name', example: 'Cielo, Getnet, Stone' })
	@IsNotEmpty()
	@IsString()
	accreditorName: string;

	@ApiProperty({ type: 'number', required: true, example: 1 })
	@IsNotEmpty()
	@IsNumber()
	nrId: number;

	@ApiProperty({ type: 'number', required: true, description: 'Merchant Category Code', example: 1414 })
	@IsNotEmpty()
	@IsNumber()
	mcc: number;

	@ApiProperty({ type: 'number', required: true, description: 'Pan number', example: 65006500 })
	@IsNotEmpty()
	@IsNumber()
	pan: number;

	@ApiProperty({ type: 'number', required: true, example: 9955151 })
	@IsNotEmpty()
	@IsNumber()
	productBin: number;

	@ApiProperty({ type: 'number', required: true, example: 15000 })
	@IsNotEmpty()
	@IsNumber()
	saleValue: number;
}
