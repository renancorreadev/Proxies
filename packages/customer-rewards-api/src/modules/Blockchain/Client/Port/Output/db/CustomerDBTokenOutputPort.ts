import { ClientData, ClientDataInput } from '@helper/blockchain/types/contracts/client-manager-types';

export interface CustomerDBTokenOutputPort {
	findAll(): Promise<ClientData[]>;
	saveCustomer(clientDataInput: ClientDataInput): Promise<string>;
	getCustomer(clientID: number): Promise<ClientData>;
}
