// src/modules/Authentication/Domain/User.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ nullable: true })
	walletAddress: string;

	@Column({ default: false })
	isAdmin: boolean;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;

	updateTimestamp() {
		this.updatedAt = new Date();
	}
}
