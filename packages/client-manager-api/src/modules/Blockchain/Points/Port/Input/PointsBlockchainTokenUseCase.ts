import { AddPointsRequestDto } from '../../Domain/Dto/HTTPRequest/AddPointsRequestDto';

export interface PointsBlockchainTokenUseCase {
	addPoints(addPointsRequestDTO: AddPointsRequestDto): Promise<string>;
	getClientPoints(clientId: number): Promise<number>;
	getClientLevel(clientId: number): Promise<number>;
}
