import { ApiProperty } from '@nestjs/swagger';

class Benefit {
	@ApiProperty({ example: 'Nível', description: 'Tipo do benefício', required: false })
	level_type?: string;

	@ApiProperty({ example: 1, description: 'Valor do benefício', required: false })
	value?: number;
}

class Attributes {
	@ApiProperty({ example: 240, description: 'Pontos do cliente', required: false })
	points?: number;

	@ApiProperty({ example: 1, description: 'Nível do cliente', required: false })
	level?: number;

	@ApiProperty({
		type: [Benefit],
		description: 'Lista de benefícios',
		required: false,
		example: [
			{ level_type: 'Nível', value: 1 },
			{ level_type: 'NFT', value: 'CUSTOMER_TITANIUM' },
			{
				level_type: 'Benefits',
				value: [
					{ discount: '35%', description: 'Desconto de 20% em todos os produtos.' },
					{ freeFrete: 'Frete GRATIS', description: 'Frete GRATIS em todo Brasil.' },
					{ promotionLevel: 'Promoção nivel 2', description: 'Acesso ao nível 2 do catálogo de promoção' },
					{ bonus: 'Bonus Nivel 2', description: 'Acesso aos bonus oferecido pela empresa no nivel 2' },
				],
			},
		],
	})
	benefits?: Benefit[];
}

export class UpdateMetadataSwaggerBodyAPI {
	@ApiProperty({ example: 1, description: 'O ID único do token' })
	tokenID: number;

	@ApiProperty({ example: 'Nome do cliente', description: 'Nome do cliente' })
	customer: string;

	@ApiProperty({ example: 'Descrição do nível do cliente', description: 'Descrição do nível do cliente' })
	description: string;

	@ApiProperty({ example: 'https://meusite.com/imagens/nft/1.png', description: 'URL da imagem do NFT' })
	image: string;

	@ApiProperty({ example: 'Insígnia do cliente', description: 'Insígnia do cliente' })
	insight: string;

	@ApiProperty({
		type: Attributes,
		description: 'Atributos adicionais do cliente',
	})
	attributes: Attributes;
}
