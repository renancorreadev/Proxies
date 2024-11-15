import { BalanceOfBatchParam, BalanceOfParam } from '@helper/blockchain/types/contracts/points-core-types';
import {
	AddPointsRequestDto,
	RemovePointsRequestDTO,
	SetDrexAddressRequestDTO,
} from '../../Domain/Dto/HTTPRequest/AddPointsRequestDto';

export interface PointsBlockchainTokenOutputPort {
	addPoints(registerClientBlockchainDto: AddPointsRequestDto): Promise<string>;
	removePoints(removePointsDTO: RemovePointsRequestDTO): Promise<string>;
	getClientPoints(clientId: number): Promise<number>;
	getClientLevel(clientId: number): Promise<number>;
	getMultiplesNFT(params: BalanceOfBatchParam): Promise<number[]>;
	getUniqueNFT(params: BalanceOfParam): Promise<number>;
	setDrexContractAddress(address: SetDrexAddressRequestDTO): Promise<string>;
	getContractVersion(): Promise<string>;
}
