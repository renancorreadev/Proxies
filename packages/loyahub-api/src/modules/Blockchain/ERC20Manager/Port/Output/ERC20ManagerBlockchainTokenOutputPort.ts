import { ApproveDrexRequestDTO } from '../../Domain/Dto/HTTPRequest/approve-request-dto';
import { GetBalanceRequestDTO } from '../../Domain/Dto/HTTPRequest/get-balance-request-dto';
import { TransferDrexRequestDTO } from '../../Domain/Dto/HTTPRequest/transfer-request-dto';

export interface ERC20ManagerBlockchainTokenOutputPort {
	getBalanceDrex(params: GetBalanceRequestDTO): Promise<number>;
	approveDrex(params: ApproveDrexRequestDTO): Promise<boolean>;
	transferDrex(params: TransferDrexRequestDTO): Promise<string>;
}
