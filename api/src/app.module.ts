import { Module } from '@nestjs/common';
import { AuthorizationBlockChainAdapter } from './Blockchain/Adapter/Output/AuthorizationBlockChainAdapter';
import { AuthorizationWebAdapter } from './Blockchain/Adapter/input/AuthorizationWebAdapter';
import { AuthorizationService } from './Blockchain/Domain/AuthorizationService';

import { DependencyInjectionTokens } from './helper/AppConstants';

@Module({
	imports: [],
	controllers: [
		AuthorizationWebAdapter,
	],
	providers: [
		{
			useClass: AuthorizationService,
			provide: DependencyInjectionTokens.AUTHORIZATION_TOKEN_USE_CASE,
		},
		{
			useClass: AuthorizationBlockChainAdapter,
			provide: DependencyInjectionTokens.AUTHORIZATION_TOKEN_OUTPUT_PORT,
		},
	],
})
export class AppModule {}
