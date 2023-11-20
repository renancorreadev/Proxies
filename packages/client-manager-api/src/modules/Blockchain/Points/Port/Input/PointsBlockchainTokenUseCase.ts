import { AddPointsRequestDto } from '../../Domain/Dto/HTTPRequest/AddPointsRequestDto';

export interface PointsBlockchainTokenUseCase {
	addPoints(addPointsRequestDTO: AddPointsRequestDto): Promise<string>;
}
