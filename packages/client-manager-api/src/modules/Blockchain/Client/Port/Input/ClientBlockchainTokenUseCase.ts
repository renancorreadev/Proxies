import { RegisterClientRequestDto } from 'client-manager-api/src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';
import { ClientData } from '@client-manager-contract-types/';

export interface ClientBlockchainTokenUseCase {
	getClientData(clientId: number): Promise<ClientData>;
	registerClient(registerClientDTO: RegisterClientRequestDto): Promise<any>;
}
