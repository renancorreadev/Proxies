// src/modules/User/Domain/DTO/UserDTO.ts
export class UserDTO {
	email: string;
	password: string;
	walletAddress?: string;
	isAdmin?: boolean;

	constructor(email: string, password: string, walletAddress?: string, isAdmin?: boolean) {
		this.email = email;
		this.password = password;
		this.walletAddress = walletAddress;
		this.isAdmin = isAdmin;
	}
}
