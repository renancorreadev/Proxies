import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ nullable: true })
	walletAddress: string;

	@Column({ nullable: true })
	profileImageUrl: string;

	@Column({ default: false })
	isAdmin: boolean;

	@Column({ type: 'int', nullable: true })
	age: number;

	@Column({ type: 'jsonb', nullable: true })
	address: {
		Street: string;
		City: string;
		PostalCode: string;
		HouseNumber: string;
	};

	@Column({ type: 'int', default: 0 })
	paymentStatus: number;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;

	updateTimestamp() {
		this.updatedAt = new Date();
	}
}
