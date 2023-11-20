import { Module } from '@nestjs/common';
import { ClientBlockchainAdapter } from './modules/Blockchain/Client/Adapter/Output/ClientBlockchainAdapter';
import { ClientWebAdapter } from './modules/Blockchain/Client/Adapter/input/ClientWebAdapter';
import { ClientBlockchainService } from './modules/Blockchain/Client/Domain/ClientBlockchainService';

import { PointsBlockchainService } from './modules/Blockchain/Points/Domain/Dto/PointsBlockchainService';
import { PointsBlockchainAdapter } from './modules/Blockchain/Points/Adapter/Output/PointsBlockChainAdapter';
import { PointsBlockchainWebAdapter } from './modules/Blockchain/Points/Adapter/input/PointsBlockchainWebAdapter';

import { DependencyInjectionTokens } from './helper/AppConstants';

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
	],
})
export class AppModule {}
