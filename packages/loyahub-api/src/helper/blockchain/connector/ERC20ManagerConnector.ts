import { ContractTransactionReceipt } from 'ethers';
import { ERC20ManagerBlockchainConnector } from '../ERC20ManagerBlockchainConnector';
import { BalanceOfParam, TransferToParam, ApproveParam } from '../types/contracts/erc20-manager-types';

import { IERC20ManagerConnector } from './interfaces/IERC20ManagerConnector';

export class ERC20ManagerConnector extends ERC20ManagerBlockchainConnector implements IERC20ManagerConnector {
	async balanceOf(params: BalanceOfParam): Promise<number> {
		try {
			const { address } = params;
			const balance = await this.contract.balanceOf(address);

			return Number(balance);
		} catch (e) {
			console.error('Erro ao recuperar pontos do cliente:', e);

			const errorMessage = e instanceof Error ? e.message : 'Unknown error';
			throw new Error(`Erro na function balanceOf do contrato na EVM: ${errorMessage}`);
		}
	}

	async transferERC20(params: TransferToParam): Promise<ContractTransactionReceipt> {
		try {
			const { to, amount } = params;
			const tx = await this.contract.transfer(to, amount, {
				gasLimit: 500000,
				gasPrice: 0,
			});

			return await tx.wait();
		} catch (e) {
			console.error('Erro ao enviar token Drex para o cliente:', e);

			const errorMessage = e instanceof Error ? e.message : 'Unknown error';
			throw new Error(`Erro ao escrever na função transfer do contrato na EVM: ${errorMessage}`);
		}
	}

	async approve(params: ApproveParam): Promise<ContractTransactionReceipt> {
		try {
			const { spender, amount } = params;
			const tx = await this.contract.approve(spender, amount, {
				gasLimit: 500000,
				gasPrice: 0,
			});

			return await tx.wait();
		} catch (e) {
			console.error('Erro ao aprovar o gasto do token Drex:', e);
		}
	}
}
