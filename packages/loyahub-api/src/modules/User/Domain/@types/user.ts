export interface UserInfo {
	id: number;
	email: string;
	walletAddress: string;
	isAdmin: boolean;
	age: number;
	address: {
		Street: string;
		City: string;
		PostalCode: string;
		HouseNumber: string;
	};
	paymentStatus: number;
	username: string;
	profileImageUrl: string;
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
	username: string;
	password: string;
	walletAddress: string;
	profileImageUrl?: string;
	privateKey?: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}
