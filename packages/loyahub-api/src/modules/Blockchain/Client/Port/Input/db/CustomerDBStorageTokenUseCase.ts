import { ClientData, ClientDataInput } from '@helper/blockchain/types/contracts/client-manager-types';

export interface CustomerDBStorageTokenUseCase {
	findAll(): Promise<ClientData[]>;
	saveCustomer(clientDataInput: ClientDataInput): Promise<ClientData>;
	getCustomer(clientID: number): Promise<ClientData>;
}
