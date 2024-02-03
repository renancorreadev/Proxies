import { Module } from '@nestjs/common';
import { ClientBlockchainAdapter } from './modules/Blockchain/Client/Adapters/Output/ClientBlockChainAdapter';
import { ClientWebAdapter } from './modules/Blockchain/Client/Adapters/input/ClientWebAdapter';
import { ClientBlockchainService } from './modules/Blockchain/Client/Domain/ClientBlockchainService';

import { PointsBlockchainService } from './modules/Blockchain/Points/Domain/PointsBlockchainService';
import { PointsBlockchainAdapter } from './modules/Blockchain/Points/Adapters/Output/PointsBlockChainAdapter';
import { PointsBlockchainWebAdapter } from './modules/Blockchain/Points/Adapters/input/PointsBlockchainWebAdapter';

import { DependencyInjectionTokens } from './helper/AppConstants';
import { BlockchainClientConnectionProvider, BlockchainPointsConnectionProvider } from '@config/Blockchain/connection';

import { DataSource } from 'typeorm';

import { MetadataWebAdapter } from './modules/Metadata/Adapters/Input/MetadataWebAdapter';

import { MetadataAdapter } from './modules/Metadata/Adapters/Output/MetadataAdapter';
import { CustomerDBStorageStorageAdapter } from './modules/Blockchain/Client/Adapters/Output/db/CustomerDBStorageAdapter';
import { CustomerDBAdapter } from './modules/Blockchain/Client/Adapters/Output/db/CustomerDBAdapter';
import { CustomerDBWebAdapter } from './modules/Blockchain/Client/Adapters/input/CustomerDBWebAdapter';
import { MetadataStorageAdapter } from './modules/Metadata/Adapters/Output/MetadataStorageAdapter';

import { MetadataService } from './modules/Metadata/Domain/MetadataService';
import { CustomerDBService } from './modules/Blockchain/Client/Domain/CustomerDBService';

import { CustomerEntity } from './modules/Blockchain/Client/Adapters/Output/db/entity/CustomerEntity';
import { MetadataEntity } from './modules/Metadata/Adapters/Output/Entity/MetadataEntity';

import { PointsDBStorageAdapter } from './modules/Blockchain/Points/Adapters/Output/PointsDBStorageAdapter';

import { UserEntity } from './modules/Authentication/Adapters/Output/db/UserEntity';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationWebAdapter } from './modules/Authentication/Adapters/Input/AuthenticationWebAdapter';
import { AuthenticationService } from './modules/Authentication/Domain/AuthenticationService';
import { AuthenticationAdapter } from './modules/Authentication/Adapters/Output/AuthenticationAdapter';

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'secretKey',
			signOptions: { expiresIn: '60s' },
		}),
	],
	controllers: [
		ClientWebAdapter,
		PointsBlockchainWebAdapter,
		MetadataWebAdapter,
		CustomerDBWebAdapter,
		AuthenticationWebAdapter,
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
		{
			useClass: PointsBlockchainService,
			provide: DependencyInjectionTokens.POINTS_BLOCKCHAIN_TOKEN_USE_CASE,
		},
		{
			useClass: PointsBlockchainAdapter,
			provide: DependencyInjectionTokens.POINTS_BLOCKCHAIN_TOKEN_OUTPUT_PORT,
		},
		{
			useClass: PointsDBStorageAdapter,
			provide: DependencyInjectionTokens.POINTS_DB_STORAGE_OUTPUT_PORT,
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
		{
			useClass: CustomerDBService,
			provide: DependencyInjectionTokens.CUSTOMER_DB_TOKEN_USE_CASE,
		},
		{
			useClass: CustomerDBStorageStorageAdapter,
			provide: DependencyInjectionTokens.CUSTOMER_DB_STORAGE_OUTPUT_PORT,
		},
		{
			useClass: CustomerDBAdapter,
			provide: DependencyInjectionTokens.CUSTOMER_DB_TOKEN_OUTPUT_PORT,
		},
		{
			useClass: AuthenticationService,
			provide: DependencyInjectionTokens.AUTH_TOKEN_USE_CASE,
		},
		{
			useClass: AuthenticationAdapter,
			provide: DependencyInjectionTokens.AUTH_TOKEN_OUTPUT_PORT,
		},
		BlockchainClientConnectionProvider,
		BlockchainPointsConnectionProvider,
		{
			provide: DependencyInjectionTokens.DATA_SOURCE,
			useFactory: async () => {
				const dataSource = new DataSource({
					type: 'postgres',
					url: process.env.CONNECTION_STRING,
					entities: [MetadataEntity, CustomerEntity, UserEntity],
					synchronize: true,
					// ssl: {
					// 	requestCert: true,
					// 	rejectUnauthorized: false,
					// },
				});

				return dataSource.initialize();
			},
		},
	],
})
export class AppModule {}
