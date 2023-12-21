import { BalanceOfBatchParam, RemovePointsParamInput } from '@helper/blockchain/types/contracts/points-core-types';
import { AddPointsParamInput } from '@helper/blockchain/types/contracts/points-core-types';
import { ContractTransactionReceipt } from 'ethers';

export interface IPointManagerConnector {
	// Setters blockchain States
	addPoints(params: AddPointsParamInput): Promise<ContractTransactionReceipt>;
	removePoints(params: RemovePointsParamInput): Promise<ContractTransactionReceipt>;
	// Getters blockchain States
	getClientLevel(clientID: number): Promise<number>;
	getClientPoints(clientID: number): Promise<number>;
	getBalanceOf(account: string, id: number): Promise<number>;
	getBalanceOfBatch(params: BalanceOfBatchParam): Promise<number[]>;
}
