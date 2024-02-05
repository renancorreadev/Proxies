import { UserData, UserInfo, UserUpdater } from '../../Domain/@types/user';

export interface UserTokenOutputPort {
	register(email: string, password: string, isAdmin?: boolean): Promise<UserData>;
	deleteUser(email: string): Promise<string>;
	updateUser(email: string, updatedUserData: UserUpdater): Promise<UserInfo>;
	getUser(email: string): Promise<UserInfo | undefined>;
}
