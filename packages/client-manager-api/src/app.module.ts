import { Module } from '@nestjs/common';
import { ClientBlockchainAdapter } from './modules/Blockchain/Client/Adapter/Output/ClientBlockchainAdapter';
import { ClientWebAdapter } from './modules/Blockchain/Client/Adapter/input/ClientWebAdapter';
import { ClientBlockchainService } from './modules/Blockchain/Client/Domain/ClientBlockchainService';

import { DependencyInjectionTokens } from './helper/AppConstants';

@Module({
	imports: [],
	controllers: [
		ClientWebAdapter,
	],
	providers: [
		{
			useClass: ClientBlockchainService,
			provide: DependencyInjectionTokens.CLIENT_BLOCKCHAIN_TOKEN_USE_CASE,
		},
		{
			useClass: ClientBlockchainAdapter,
			provide: DependencyInjectionTokens.CLIENTBLOCKCHAIN_TOKEN_OUTPUT_PORT,
		},
	],
})
export class AppModule {}
