export interface UserInfo {
	id: number;
	email: string;
	walletAddress: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserUpdater {
	email?: string;
	walletAddress?: string;
	isAdmin?: boolean;
}

export interface UserData {
	id: number;
	email: string;
	password: string;
	walletAddress: string;
	profileImageUrl?: string;
	privateKey?: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}
