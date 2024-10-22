import { KeycloakLoginDTO } from '../../Domain/DTO/HTTPRequest/AuthenticationRequest';

export interface KeycloakTokenOutputPort {
	login(loginDTO: KeycloakLoginDTO): Promise<{ access_token: string }>;
	logout(refreshToken: string): Promise<void>;
	refresh(refreshToken: string): Promise<{ access_token: string }>;
}
