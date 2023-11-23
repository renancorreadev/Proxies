import { Module } from '@nestjs/common';
import { ClientBlockchainAdapter } from './modules/blockchain/Client/Adapter/Output/ClientBlockChainAdapter';
import { ClientWebAdapter } from './modules/blockchain/Client/Adapter/input/ClientWebAdapter';
import { ClientBlockchainService } from './modules/blockchain/Client/Domain/ClientBlockchainService';

import { PointsBlockchainService } from './modules/blockchain/Points/Domain/PointsBlockchainService';
import { PointsBlockchainAdapter } from './modules/blockchain/Points/Adapter/Output/PointsBlockChainAdapter';
import { PointsBlockchainWebAdapter } from './modules/blockchain/Points/Adapter/input/PointsBlockchainWebAdapter';

import { DependencyInjectionTokens } from './helper/AppConstants';
import { BlockchainClientConnectionProvider, BlockchainPointsConnectionProvider } from '@config/Blockchain/connection';
import { MetadataStorageAdapter } from './modules/metadata/Adapters/Output/MetadataStorageAdapter';

import { DataSource } from 'typeorm';
import { MetadataEntity } from './modules/metadata/Adapters/Output/Entity/MetadataEntity';
import { MetadataWebAdapter } from './modules/metadata/Adapters/Input/MetadataWebAdapter';
import { MetadataService } from './modules/metadata/Domain/MetadataService';
import { MetadataAdapter } from './modules/metadata/Adapters/Output/MetadataAdapter';

@Module({
	imports: [],
	controllers: [ClientWebAdapter, PointsBlockchainWebAdapter, MetadataWebAdapter],
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
		{
			useClass: MetadataStorageAdapter,
			provide: DependencyInjectionTokens.METADATA_STORAGE_OUTPUT_PORT,
		},
		{
			useClass: MetadataStorageAdapter,
			provide: DependencyInjectionTokens.METADATA_STORAGE_OUTPUT_PORT,
		},
		{
			useClass: MetadataAdapter,
			provide: DependencyInjectionTokens.METADATA_TOKEN_OUTPUT_PORT,
		},
		{
			useClass: MetadataService,
			provide: DependencyInjectionTokens.METADATA_TOKEN_USE_CASE,
		},
		BlockchainClientConnectionProvider,
		BlockchainPointsConnectionProvider,
		{
			provide: DependencyInjectionTokens.DATA_SOURCE,
			useFactory: async () => {
				const dataSource = new DataSource({
					type: 'postgres',
					url: process.env.CONNECTION_STRING,
					entities: [MetadataEntity],
					synchronize: true,
					ssl: {
						requestCert: true,
						rejectUnauthorized: false,
					},
				});

				return dataSource.initialize();
			},
		},
	],
})
export class AppModule {}
