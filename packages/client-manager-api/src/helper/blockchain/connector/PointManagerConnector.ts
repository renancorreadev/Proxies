import { PointCoreBlockchainConnector } from '../PointsCoreBlockchainConnector';
import { AddPointsParamInput } from '../types/contracts/points-core-types';

export class PointsManagerConnector extends PointCoreBlockchainConnector {
	// Setters blockchain States
	async addPoints(params: AddPointsParamInput) {
		try {
			const { clientId, points } = params;
			const tx = await this.contract.addPoints(clientId, points, {
				gasLimit: 500000,
				gasPrice: 0,
			});

			await tx.wait();
		} catch (e) {
			console.error('Erro ao enviar pontos para o cliente:', e);

			const errorMessage = e instanceof Error ? e.message : 'Unknown error';
			throw new Error(`Erro ao escrever na função addPoints do contrato na EVM: ${errorMessage}`);
		}
	}
}
