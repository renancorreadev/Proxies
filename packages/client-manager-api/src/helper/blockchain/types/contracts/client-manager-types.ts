export type AddressLocal = {
	City: string;
	Street: string;
	PostalCode: number;
	HouseNumber: number;
};

export interface ClientData {
	name: string;
	age: number;
	WalletAddress: string;
	paymentStatus: number;
	addressLocal: AddressLocal;
}
