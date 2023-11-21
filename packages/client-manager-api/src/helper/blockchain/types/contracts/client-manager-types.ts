export type AddressLocal = {
	City: string;
	Street: string;
	PostalCode: number;
	HouseNumber: number;
};

export interface ClientData {
	clientID: number;
	name: string;
	age: number;
	WalletAddress: string;
	paymentStatus: number;
	addressLocal: AddressLocal;
}

export interface ClientDataInput {
	name: string;
	age: number;
	WalletAddress: string;
	paymentStatus: number;
	addressLocal: AddressLocal;
}
