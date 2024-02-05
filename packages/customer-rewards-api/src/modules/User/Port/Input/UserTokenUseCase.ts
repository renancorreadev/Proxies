import { UserInfo, UserUpdater } from '../../Domain/@types/user';
import { UserRegisterDTORequest } from '../../Domain/DTO/HTTPRequest/userHttpRequest';
import { UserRegisterResponse } from '../../Domain/DTO/HTTPResponse/userHttpResponse';

export interface UserTokenUseCase {
	register(registerUserDTO: UserRegisterDTORequest): Promise<UserRegisterResponse>;
	deleteUser(email: string): Promise<string>;
	updateUser(email: string, updatedUserData: UserUpdater): Promise<UserInfo>;
	getUser(email: string): Promise<UserInfo | undefined>;
}
