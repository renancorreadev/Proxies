import { RegisterClientRequestDto } from '@src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';

export interface ClientBlockchainTokenUseCase {
	registerClient(authorizationRequestDto: RegisterClientRequestDto): Promise<any>;
}
