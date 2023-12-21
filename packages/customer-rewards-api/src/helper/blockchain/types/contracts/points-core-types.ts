import { BigNumberish } from 'ethers';

export type AddPointsParamInput = {
	clientId: BigNumberish;
	points: BigNumberish;
};

export type RemovePointsParamInput = {
	clientId: BigNumberish;
	points: BigNumberish;
};

export type BalanceOfParam = {
	account: string;
	id: number;
};

export type BalanceOfBatchParam = {
	accounts: string[];
	ids: number[];
};
