import { UserEntity } from '../../Adapters/Output/db/UserEntity';
import { LoginDTO } from '../../Domain/DTO/HTTPRequest/AuthenticationRequest';

export interface UserData {
	id: number;
	email: string;
	password: string;
	walletAddress: string;
	privateKey?: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserInfo {
	id: number;
	email: string;
	walletAddress: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}
export interface AuthenticationTokenOutputPort {
	register(email: string, password: string, isAdmin?: boolean): Promise<UserData>;
	login(loginDTO: LoginDTO): Promise<{ access_token: string }>;
	validateUser(payload: any): Promise<any>;
	deleteUser(email: string): Promise<string>;
	updateUser(email: string, updatedUserData: Partial<UserEntity>): Promise<UserEntity>;
	getUser(email: string): Promise<UserInfo | undefined>;
}
