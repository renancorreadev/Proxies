import { LoginDTO } from '../../Domain/DTO/HTTPRequest/AuthenticationRequest';

export interface UserData {
	id: number;
	email: string;
	password: string;
	walletAddress: string;
	privateKey: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}
export interface AuthenticationTokenOutputPort {
	register(email: string, password: string): Promise<UserData>;
	login(loginDTO: LoginDTO): Promise<{ access_token: string }>;
	validateUser(payload: any): Promise<any>;
}
