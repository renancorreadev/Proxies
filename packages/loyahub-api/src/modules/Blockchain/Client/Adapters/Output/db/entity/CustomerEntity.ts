import { AddressLocal } from '@helper/blockchain/types/contracts/client-manager-types';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customer' })
export class CustomerEntity {
	@PrimaryGeneratedColumn()
	clientID: number;

	@Column({ type: 'varchar' })
	name: string;

	@Column({ type: 'int' })
	age: number;

	@Column({ type: 'varchar' })
	walletAddress: string;

	@Column({ type: 'int' })
	paymentStatus: number;

	@Column({ type: 'int', nullable: true })
	points: number;

	@Column({ type: 'json' })
	addressLocal: AddressLocal;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;

	@BeforeInsert()
	updateTimestamps() {
		this.updatedAt = new Date();
		if (!this.createdAt) {
			this.createdAt = new Date();
		}
	}
}
