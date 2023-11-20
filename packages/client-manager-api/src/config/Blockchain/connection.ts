// blockchain-connection.provider.ts
import { Provider } from '@nestjs/common';
import { DependencyInjectionBlockchainConnector } from '@helper/AppConstants';
import { ClientManagerConnector } from 'client-manager-api/src/helper/blockchain/connector/ClientManagerConnector';

export const BlockchainConnectionProvider: Provider = {
	provide: DependencyInjectionBlockchainConnector.CLIENT_MANAGER_CONNECTOR,
	useFactory: (): ClientManagerConnector => {
		return new ClientManagerConnector(process.env.CONTRACT_ADDRESS, process.env.PROVIDER, process.env.PRIVATE_KEY);
	},
};
