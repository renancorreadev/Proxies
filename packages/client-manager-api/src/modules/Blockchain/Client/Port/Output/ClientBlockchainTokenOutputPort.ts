import { RegisterClientRequestDto } from 'client-manager-api/src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';
import { ClientData } from '@client-manager-connector/';

export interface ClientBlockchainTokenOutputPort {
	getClientData(clientId: number): Promise<ClientData>;
	registerClient(registerClientDTO: RegisterClientRequestDto): Promise<any>;
}
