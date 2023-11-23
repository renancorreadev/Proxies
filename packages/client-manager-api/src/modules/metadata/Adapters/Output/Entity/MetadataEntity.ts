import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
	name: 'metadata',
})
export class MetadataEntity {
	constructor(customer: string, description: string, image: string, insight: string, attributes: [any]) {
		(this.customer = customer),
			(this.description = description),
			(this.image = image),
			(this.insight = insight),
			(this.attributes = attributes);
	}
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', nullable: false })
	customer: string;

	@Column({ type: 'varchar', nullable: false })
	description: string;

	@Column({ type: 'varchar', nullable: false })
	image: string;

	@Column({ type: 'varchar', nullable: false })
	insight: string;

	@Column({ type: 'jsonb', nullable: false })
	// Um array de objetos para armazenar os atributos
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
