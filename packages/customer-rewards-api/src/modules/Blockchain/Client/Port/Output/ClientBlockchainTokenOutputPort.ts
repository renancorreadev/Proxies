import { RegisterClientRequestDto } from '@/src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';
import { ClientData } from '@client-manager-connector/';

export interface ClientBlockchainTokenOutputPort {
	getClientData(clientId: number): Promise<ClientData>;
	registerClient(registerClientDTO: RegisterClientRequestDto): Promise<any>;
	getClientByName(getClientByNameRequestDTO: string): Promise<ClientData>;
	getClientByAge(getClientByAgeRequestDTO: number): Promise<ClientData>;
	getClientByWallet(getClientByWalletRequestDTO: string): Promise<ClientData>;
	getAllCustomers(): Promise<ClientData[]>;
}
