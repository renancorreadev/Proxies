import { RegisterClientRequestDto } from '@src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';

export interface ClientBlockchainTokenOutputPort {
	registerClient(registerClientDTO: RegisterClientRequestDto): Promise<any>;
}
