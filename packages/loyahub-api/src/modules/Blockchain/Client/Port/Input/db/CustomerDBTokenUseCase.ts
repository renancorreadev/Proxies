import { ClientData, ClientDataInput } from '@helper/blockchain/types/contracts/client-manager-types';

export interface CustomerDBTokenUseCase {
	findAll(): Promise<ClientData[]>;
	saveCustomer(clientDataInput: ClientDataInput): Promise<string>;
	getCustomer(clientID: number): Promise<ClientData>;
}
