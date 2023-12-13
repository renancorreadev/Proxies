import { ClientData } from '@helper/blockchain/types/contracts/client-manager-types';
import { ContractTransactionReceipt } from 'ethers';

export interface IClientManagerConnector {
	registerClient(params: ClientData): Promise<ContractTransactionReceipt>;
	getClientData(clientId: number): Promise<ClientData>;
	getClientByName(name: string): Promise<ClientData>;
	getClientByAge(age: number): Promise<ClientData>;
	getClientByWallet(wallet: string): Promise<ClientData>;
}
