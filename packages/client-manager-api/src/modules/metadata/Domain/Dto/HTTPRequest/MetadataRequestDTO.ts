import { ApiProperty } from '@nestjs/swagger';
import { MetadataAttribute } from '../../../Adapters/Output/Entity/MetadataEntity';

export class AttributeLevel {
	@ApiProperty({ example: 1, description: 'O nível do cliente' })
	value: number;

	@ApiProperty({ example: 'Nível', description: 'Tipo do atributo' })
	level_type: string;
}

export class AttributeNFT {
	@ApiProperty({ example: 'CUSTOMER_PREMIUM', description: 'Tipo de NFT' })
	value: string;

	@ApiProperty({ example: 'Nível', description: 'Tipo do atributo' })
	nft_type: string;
}

export class Benefit {
	@ApiProperty({ example: '10%', description: 'Desconto oferecido' })
	discount?: string;

	@ApiProperty({ example: 'Frete GRATIS', description: 'Frete grátis' })
	FreeFrete?: string;

	@ApiProperty({ example: 'Promoção nivel I', description: 'Promoção de nível I' })
	promotionLevel1?: string;

	@ApiProperty({ example: 'Descrição do benefício', description: 'Descrição do benefício' })
	description: string;
}

export class AttributeBenefits {
	@ApiProperty({
		type: [Benefit],
		description: 'Lista de benefícios',
	})
	value: Benefit[];

	@ApiProperty({ example: 'CUSTOMER_PREMIUM', description: 'Tipo de atributo' })
	benefit_type: string;
}

export class RegisterMetadataBody {
	@ApiProperty({ example: 1, description: 'O ID único do token' })
	tokenID: number;

	@ApiProperty({ example: 'Renan Cesar de Franca Correa', description: 'Nome do cliente' })
	customer: string;

	@ApiProperty({
		example: 'Você está no nível I com a insígnia Customer Premium',
		description: 'Descrição do nível do cliente',
	})
	description: string;

	@ApiProperty({ example: 'https://meusite.com/imagens/nft/1.png', description: 'URL da imagem do NFT' })
	image: string;

	@ApiProperty({ example: 'CUSTOMER_PREMIUM', description: 'Insígnia do cliente' })
	insight: string;

	@ApiProperty({
		type: [AttributeLevel, AttributeNFT, AttributeBenefits],
		description: 'Atributos adicionais do NFT',
	})
	attributes: {
		level_type?: string;
		value?: number;
		nft_type?: string;
		benefit_type?: string;
		benefits?: Benefit[];
	}[];
}

export interface RegisterMetadataDTORequest {
	tokenID: number;
	customer: string;
	description: string;
	image: string;
	insight: string;
	attributes: MetadataAttribute[];
}
