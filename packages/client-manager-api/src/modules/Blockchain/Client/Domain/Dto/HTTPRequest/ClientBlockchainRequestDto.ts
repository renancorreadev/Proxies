import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class AddressLocalDto {
	@ApiProperty({ type: String, required: true, example: 'Guarapari' })
	@IsNotEmpty()
	@IsString()
	City: string;

	@ApiProperty({ type: String, required: true, example: 'R.Joana SIlva' })
	@IsNotEmpty()
	@IsString()
	Street: string;

	@ApiProperty({ type: Number, required: true, example: '2255454' })
	@IsNotEmpty()
	@IsNumber()
	PostalCode: number;

	@ApiProperty({ type: String, required: true, example: '25' })
	@IsNotEmpty()
	@IsString()
	HouseNumber: string;
}

export class RegisterClientRequestDto {
	@ApiProperty({ type: String, required: true, example: 'Mariana' })
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ type: Number, required: true, example: 12 })
	@IsNotEmpty()
	@IsNumber()
	age: number;

	@ApiProperty({ type: String, required: true, example: '0xeAB18Bc625415f978aFf59B9eD6228Ee106D8293' })
	@IsNotEmpty()
	@IsString()
	WalletAddress: string;

	@ApiProperty({ type: Number, required: true, example: 1 })
	@IsNotEmpty()
	@IsNumber()
	paymentStatus: number;

	@ApiProperty({ type: AddressLocalDto, required: true })
	@IsNotEmpty()
	address: AddressLocalDto;
}
