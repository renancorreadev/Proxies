import { AuthorizationRequestDto } from '@src/Blockchain/Domain/Dto/RequestsDtos/AuthorizationRequestDto';

export interface AuthorizationTokenUseCase {
	createAuthorizationToken(authorizationRequestDto: AuthorizationRequestDto): Promise<string>;
}
