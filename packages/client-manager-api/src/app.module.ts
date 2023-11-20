import { Module } from '@nestjs/common';
import { ClientBlockchainAdapter } from './modules/blockchain/Client/Adapter/Output/ClientBlockchainAdapter';
import { ClientWebAdapter } from './modules/blockchain/Client/Adapter/input/ClientWebAdapter';
import { ClientBlockchainService } from './modules/blockchain/Client/Domain/ClientBlockchainService';

import { PointsBlockchainService } from './modules/blockchain/Points/Domain/PointsBlockchainService';
import { PointsBlockchainAdapter } from './modules/blockchain/Points/Adapter/Output/PointsBlockChainAdapter';
import { PointsBlockchainWebAdapter } from './modules/blockchain/Points/Adapter/input/PointsBlockchainWebAdapter';

import { DependencyInjectionTokens } from './helper/AppConstants';
import { BlockchainClientConnectionProvider, BlockchainPointsConnectionProvider } from '@config/Blockchain/connection';

@Module({
	imports: [],
	controllers: [ClientWebAdapter, PointsBlockchainWebAdapter],
	providers: [
		{
			useClass: ClientBlockchainService,
			provide: DependencyInjectionTokens.CLIENT_BLOCKCHAIN_TOKEN_USE_CASE,
		},
		{
			useClass: ClientBlockchainAdapter,
			provide: DependencyInjectionTokens.CLIENTBLOCKCHAIN_TOKEN_OUTPUT_PORT,
		},
		{
			useClass: PointsBlockchainService,
			provide: DependencyInjectionTokens.POINTS_BLOCKCHAIN_TOKEN_USE_CASE,
		},
		{
			useClass: PointsBlockchainAdapter,
			provide: DependencyInjectionTokens.POINTS_BLOCKCHAIN_TOKEN_OUTPUT_PORT,
		},
		BlockchainClientConnectionProvider,
		BlockchainPointsConnectionProvider,
	],
})
export class AppModule {}
