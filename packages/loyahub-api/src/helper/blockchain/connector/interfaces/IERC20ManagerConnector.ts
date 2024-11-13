import { BalanceOfParam } from '@helper/blockchain/types/contracts/erc20-manager-types';

export interface IERC20ManagerConnector {
	balanceOf(address: BalanceOfParam): Promise<number>;
}
