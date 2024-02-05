import { UserData, UserInfo, UserUpdater } from '../../Domain/@types/user';

import { UserRegisterDTORequest } from '../../Domain/DTO/HTTPRequest/userHttpRequest';

export interface UserTokenOutputPort {
	register(registerUserDTO: UserRegisterDTORequest): Promise<UserData>;
	deleteUser(email: string): Promise<string>;
	updateUser(email: string, updatedUserData: UserUpdater): Promise<UserInfo>;
	getUser(email: string): Promise<UserInfo | undefined>;
}
