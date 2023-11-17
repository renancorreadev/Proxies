import { ClientBlockchainRequestDto } from '@src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';

export interface ClientBlockchainTokenOutputPort {
	// init(host: string, accreditorName: string): void;
	createAuthorizationToken(authorizationInput: ClientBlockchainRequestDto): Promise<string>;
}
