import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetContractVersionResponse {
	@ApiProperty({ type: String, required: true, example: '1.0.1' })
	@IsNotEmpty()
	@IsString()
	version: string;
}
