import { ApiProperty } from '@nestjs/swagger';

export class GetAllNFTsRequestDTO {
	@ApiProperty({ type: [String] })
	accounts: string[];

	@ApiProperty({ type: [Number] })
	ids: number[];
}
