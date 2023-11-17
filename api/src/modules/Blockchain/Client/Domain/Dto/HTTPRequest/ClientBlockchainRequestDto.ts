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
