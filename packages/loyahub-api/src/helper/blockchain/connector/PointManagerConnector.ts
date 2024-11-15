import { PointCoreBlockchainConnector } from '../PointsCoreBlockchainConnector';
import {
	AddPointsParamInput,
	BalanceOfBatchParam,
	RemovePointsParamInput,
	SetDrexAddressParamInput,
} from '../types/contracts/points-core-types';
import { IPointManagerConnector } from './interfaces/IPointManagerConnector';
import { ContractTransactionReceipt } from 'ethers';

export class PointsManagerConnector extends PointCoreBlockchainConnector implements IPointManagerConnector {
	/// @dev NFT IDs
	// private CUSTOMER_TITANIUM_NFT_ID = 3;
	// private CUSTOMER_GOLD_NFT_ID = 2;
	// private CUSTOMER_PREMIUM_NFT_ID = 1;

	// Setters blockchain States
	async addPoints(params: AddPointsParamInput): Promise<ContractTransactionReceipt> {
		try {
			const { clientId, points } = params;
			const tx = await this.contract.addPoints(clientId, points, {
				gasLimit: 500000,
				gasPrice: 0,
			});

			return await tx.wait();
		} catch (e) {
			console.error('Erro ao enviar pontos para o cliente:', e);

			const errorMessage = e instanceof Error ? e.message : 'Unknown error';
			throw new Error(`Erro ao escrever na função addPoints do contrato na EVM: ${errorMessage}`);
		}
	}

	async removePoints(params: RemovePointsParamInput): Promise<ContractTransactionReceipt> {
		try {
			const { clientId, points } = params;
			const tx = await this.contract.removePoints(clientId, points, {
				gasLimit: 500000,
				gasPrice: 0,
			});

			return await tx.wait();
		} catch (e) {
			console.error('Erro ao remover pontos do cliente:', e);

			const errorMessage = e instanceof Error ? e.message : 'Unknown error';
			throw new Error(`Erro ao escrever na função addPoints do contrato na EVM: ${errorMessage}`);
		}
	}

	async setDrexContractAddress(params: SetDrexAddressParamInput): Promise<ContractTransactionReceipt> {
		try {
			const { newAddress } = params;
			const tx = await this.contract.setPointsTokenAddress(newAddress, {
				gasLimit: 500000,
				gasPrice: 0,
			});

			return await tx.wait();
		} catch (e) {
			console.error('Erro ao setar o endereço do contrato DREX:', e);

			const errorMessage = e instanceof Error ? e.message : 'Unknown error';
			throw new Error(`Erro ao escrever na função setPointsTokenAddress do contrato na EVM: ${errorMessage}`);
		}
	}

	async getClientLevel(clientID: number): Promise<number> {
		try {
			return Number(await this.contract.getClientLevel(clientID));
		} catch (e) {
			console.error('Erro ao recuperar level do cliente:', e);

			const errorMessage = e instanceof Error ? e.message : 'Unknown error';
			throw new Error(`Erro na function getClientLevel do contrato na EVM: ${errorMessage}`);
		}
	}

	async getClientPoints(clientID: number): Promise<number> {
		try {
			return Number(await this.contract.getClientPoints(clientID));
		} catch (e) {
			console.error('Erro ao recuperar pontos do cliente:', e);

			const errorMessage = e instanceof Error ? e.message : 'Unknown error';
			throw new Error(`Erro na function getClientPoints do contrato na EVM: ${errorMessage}`);
		}
	}

	async getBalanceOfBatch(params: BalanceOfBatchParam): Promise<number[]> {
		const { accounts, ids } = params;
		const balance = await this.contract.balanceOfBatch(accounts, ids);

		if (balance.length === 0) {
			return [];
		}

		if (balance.length !== accounts.length) {
			throw new Error('The length of balance and accounts must be the same');
		}

		return balance.map((bigIntValue) => Number(bigIntValue));
	}

	async getBalanceOf(account: string, id: number): Promise<number> {
		try {
			const balance = await this.contract.balanceOf(account, id);

			return Number(balance);
		} catch (e) {
			console.error('Erro ao recuperar pontos do cliente:', e);

			const errorMessage = e instanceof Error ? e.message : 'Unknown error';
			throw new Error(`Erro na function balanceOf do contrato na EVM: ${errorMessage}`);
		}
	}

	async getContractVersion(): Promise<string> {
		return await this.contract.getVersion();
	}
}
