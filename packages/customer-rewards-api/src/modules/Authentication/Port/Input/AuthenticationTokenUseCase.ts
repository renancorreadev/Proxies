import { LoginDTO } from '../../Domain/DTO/HTTPRequest/AuthenticationRequest';

export interface AuthenticationTokenUseCase {
	register(email: string, password: string): Promise<any>;
	login(loginDTO: LoginDTO): Promise<{ access_token: string }>;
	validateUser(payload: any): Promise<any>;
}
