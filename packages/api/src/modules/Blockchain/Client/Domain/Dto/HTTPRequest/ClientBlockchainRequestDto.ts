import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class AddressLocalDto {
	@ApiProperty({ type: String, required: true, example: 'City' })
	@IsNotEmpty()
	@IsString()
	City: string;

	@ApiProperty({ type: String, required: true, example: 'Street' })
	@IsNotEmpty()
	@IsString()
	Street: string;

	@ApiProperty({ type: Number, required: true, example: 'PostalCode' })
	@IsNotEmpty()
	@IsNumber()
	PostalCode: number;

	@ApiProperty({ type: String, required: true, example: 'HouseNumber' })
	@IsNotEmpty()
	@IsString()
	HouseNumber: string;
}
class LocationResponse {
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

export class RegisterClientRequestDto {
	@ApiProperty({ type: String, required: true, example: 'Client Name' })
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ type: Number, required: true, example: 30 })
	@IsNotEmpty()
	@IsNumber()
	age: number;

	@ApiProperty({ type: String, required: true, example: 'Wallet Address' })
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

export class GetClientDataResponse {
	@ApiProperty({ type: String, required: true, example: 'Renan' })
	@IsString()
	name: string;

	@ApiProperty({ type: Number, required: true, example: 30 })
	@IsNumber()
	age: number;

	@ApiProperty({ type: String, required: true, example: '0x0000000000000000000000000000000000000000' })
	@IsString()
	WalletAddress: string;

	@ApiProperty({ type: Number, required: true, example: 1 })
	@IsNumber()
	paymentStatus: number;

	@ApiProperty({ type: LocationResponse, required: true })
	address: LocationResponse;
}
