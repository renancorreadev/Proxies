import { BalanceOfBatchParam, BalanceOfParam } from '@helper/blockchain/types/contracts/points-core-types';
import { AddPointsRequestDto } from '../../Domain/Dto/HTTPRequest/AddPointsRequestDto';

export interface PointsBlockchainTokenUseCase {
	addPoints(addPointsRequestDTO: AddPointsRequestDto): Promise<string>;
	removePoints(removePointsDTO: AddPointsRequestDto): Promise<string>;
	getClientPoints(clientId: number): Promise<number>;
	getClientLevel(clientId: number): Promise<number>;
	getMultiplesNFT(params: BalanceOfBatchParam): Promise<number[]>;
	getUniqueNFT(params: BalanceOfParam): Promise<number>;
}
