import { ClientBlockchainRequestDto } from '@src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';

export interface ClientBlockchainTokenUseCase {
	createAuthorizationToken(authorizationRequestDto: ClientBlockchainRequestDto): Promise<string>;
}
