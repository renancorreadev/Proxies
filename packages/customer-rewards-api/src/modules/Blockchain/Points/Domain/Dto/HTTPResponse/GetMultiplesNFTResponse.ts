import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetUniqueNFTResponse {
	@IsNotEmpty()
	@IsString()
	accounts: string[];

	@IsNotEmpty()
	@IsNumber()
	ids: number[];
}
