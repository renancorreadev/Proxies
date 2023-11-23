import { ApiProperty } from '@nestjs/swagger';

export class MetadataAttribute {
	@ApiProperty({ example: 1, description: 'O nível do cliente', required: false })
	value?: number;

	@ApiProperty({ example: 'Nível', description: 'Tipo do atributo', required: false })
	level_type?: string;

	@ApiProperty({ example: 'CUSTOMER_PREMIUM', description: 'Tipo de NFT', required: false })
	nft_type?: string;

	@ApiProperty({ example: 'Benefits', description: 'Tipo do atributo', required: false })
	benefit_type?: string;

	@ApiProperty({ type: 'array', items: { type: 'object' }, description: 'Lista de benefícios', required: false })
	benefits?: Benefit[];
}

export class Benefit {
	@ApiProperty({ example: '10%', description: 'Desconto oferecido' })
	discount: string;

	@ApiProperty({ example: 'Frete GRATIS', description: 'Frete grátis' })
	FreeFrete: string;

	@ApiProperty({ example: 'Promoção nivel I', description: 'Promoção de nível I' })
	promotionLevel1: string;
}
