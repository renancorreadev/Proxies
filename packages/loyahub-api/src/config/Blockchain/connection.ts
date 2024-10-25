import { Provider } from '@nestjs/common';
import { DependencyInjectionBlockchainConnector } from '@helper/AppConstants';
import { PointsManagerConnector, ClientManagerConnector } from '@helper/blockchain/connector';

export const BlockchainClientConnectionProvider: Provider = {
	provide: DependencyInjectionBlockchainConnector.CLIENT_MANAGER_CONNECTOR,
	useFactory: (): ClientManagerConnector => {
		return new ClientManagerConnector(process.env.CONTRACT_ADDRESS, process.env.PROVIDER, process.env.PRIVATE_KEY);
	},
};

export const BlockchainPointsConnectionProvider: Provider = {
	provide: DependencyInjectionBlockchainConnector.POINTS_MANAGER_CONNECTOR,
	useFactory: (): PointsManagerConnector => {
		return new PointsManagerConnector(
			process.env.POINTS_CONTRACT_ADDRESS,
			process.env.PROVIDER,
			process.env.PRIVATE_KEY,
		);
	},
};
