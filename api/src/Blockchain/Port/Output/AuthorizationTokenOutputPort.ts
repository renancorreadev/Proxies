import { AuthorizationRequestDto } from '@src/Blockchain/Domain/Dto/RequestsDtos/AuthorizationRequestDto';

export interface AuthorizationTokenOutputPort {
	// init(host: string, accreditorName: string): void;
	createAuthorizationToken(authorizationInput: AuthorizationRequestDto): Promise<string>;
}
