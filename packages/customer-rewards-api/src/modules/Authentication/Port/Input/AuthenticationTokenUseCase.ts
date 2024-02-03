import { UserEntity } from '../../Adapters/Output/db/UserEntity';
import { LoginDTO } from '../../Domain/DTO/HTTPRequest/AuthenticationRequest';
import { UserInfo } from '../Output/AuthenticationTokenOutputPort';

export interface AuthenticationTokenUseCase {
	register(email: string, password: string): Promise<any>;
	login(loginDTO: LoginDTO): Promise<{ access_token: string }>;
	validateUser(payload: any): Promise<any>;
	deleteUser(email: string): Promise<string>;
	updateUser(email: string, updatedUserData: Partial<UserEntity>): Promise<UserEntity>;
	getUser(email: string): Promise<UserInfo | undefined>;
}
