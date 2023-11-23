import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
	name: 'metadata',
})
export class MetadataEntity {
	constructor(title: string, description: string) {
		(this.title = title), (this.description = description);
	}

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', nullable: false })
	title: string;

	@Column({ type: 'varchar', nullable: false })
	description: string;

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
