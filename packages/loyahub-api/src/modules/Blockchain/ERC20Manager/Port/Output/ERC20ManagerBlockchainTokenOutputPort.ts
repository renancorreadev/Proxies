import { GetBalanceRequestDTO } from '../../Domain/Dto/HTTPRequest/get-balance-request-dto';

export interface ERC20ManagerBlockchainTokenOutputPort {
	getBalanceDrex(params: GetBalanceRequestDTO): Promise<number>;
}
