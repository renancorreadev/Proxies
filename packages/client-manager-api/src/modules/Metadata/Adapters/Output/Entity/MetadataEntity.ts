import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface AttributeLevel {
	value: number;
	level_type: string;
}

export interface AttributeNFT {
	value: string;
	nft_type: string;
}

export interface Benefit {
	discount?: string;
	FreeFrete?: string;
	promotionLevel1?: string;
	description: string;
}

export interface AttributeBenefits {
	value: Benefit[];
	benefit_type: string;
}

@Entity({
	name: 'metadata',
})
export class MetadataEntity {
	constructor(
		tokenID: number,
		customer: string,
		description: string,
		image: string,
		insight: string,
		attributes: {
			points?: number;
			level?: number;
			benefits?: {
				level_type?: string;
				nftType?: string;
				value?: number;
			}[];
		},
	) {
		(this.tokenID = tokenID),
			(this.customer = customer),
			(this.description = description),
			(this.image = image),
			(this.insight = insight),
			(this.attributes = attributes);
	}
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'int4', nullable: false })
	tokenID: number;

	@Column({ type: 'varchar', nullable: false })
	customer: string;

	@Column({ type: 'varchar', nullable: false })
	description: string;

	@Column({ type: 'varchar', nullable: false })
	image: string;

	@Column({ type: 'varchar', nullable: false })
	insight: string;

	@Column({ type: 'jsonb', nullable: false })
	attributes: any;

	@Column({ nullable: false })
	createdAt: Date;

	@Column({ nullable: false })
	updatedAt: Date;

	@BeforeInsert()
	setCreatedAt() {
		this.createdAt = new Date();
	}
	@BeforeInsert()
	setUpdatedAt() {
		this.updatedAt = new Date();
	}
}
