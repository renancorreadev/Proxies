import { GetBalanceRequestDTO } from '../../Domain/Dto/HTTPRequest/get-balance-request-dto';

export interface ERC20ManagerBlockchainTokenUseCase {
	getBalanceDrex(address: GetBalanceRequestDTO): Promise<number>;
}
