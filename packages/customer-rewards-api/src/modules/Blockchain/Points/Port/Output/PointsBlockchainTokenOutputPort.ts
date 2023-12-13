import { BalanceOfBatchParam, BalanceOfParam } from '@helper/blockchain/types/contracts/points-core-types';
import { AddPointsRequestDto } from '../../Domain/Dto/HTTPRequest/AddPointsRequestDto';

export interface PointsBlockchainTokenOutputPort {
	addPoints(addPointsRequestDTO: AddPointsRequestDto): Promise<string>;
	getClientPoints(clientId: number): Promise<number>;
	getClientLevel(clientId: number): Promise<number>;
	getMultiplesNFT(params: BalanceOfBatchParam): Promise<number[]>;
	getUniqueNFT(params: BalanceOfParam): Promise<number>;
}
