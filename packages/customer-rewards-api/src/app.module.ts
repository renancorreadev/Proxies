import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
/**
 * ALL CONFIG MODULES IMPORT
 */
import { DependencyInjectionTokens } from './helper/AppConstants';
import { BlockchainClientConnectionProvider, BlockchainPointsConnectionProvider } from '@config/Blockchain/connection';
/** ALL BLOCKCHAIN CLIENT MODULES IMPORT */
import { ClientBlockchainAdapter } from './modules/Blockchain/Client/Adapters/Output/ClientBlockChainAdapter';
import { ClientWebAdapter } from './modules/Blockchain/Client/Adapters/input/ClientWebAdapter';
import { ClientBlockchainService } from './modules/Blockchain/Client/Domain/ClientBlockchainService';
/** ALL BLOCKCHAIN CUSTOMER MODULES IMPORT */
import { CustomerDBService } from './modules/Blockchain/Client/Domain/CustomerDBService';
import { CustomerEntity } from './modules/Blockchain/Client/Adapters/Output/db/entity/CustomerEntity';
import { CustomerDBAdapter } from './modules/Blockchain/Client/Adapters/Output/db/CustomerDBAdapter';
import { CustomerDBWebAdapter } from './modules/Blockchain/Client/Adapters/input/CustomerDBWebAdapter';
import { CustomerDBStorageStorageAdapter } from './modules/Blockchain/Client/Adapters/Output/db/CustomerDBStorageAdapter';
/** ALL METADATA MODULES IMPORT */
import { MetadataWebAdapter } from './modules/Metadata/Adapters/Input/MetadataWebAdapter';
import { MetadataAdapter } from './modules/Metadata/Adapters/Output/MetadataAdapter';
import { MetadataService } from './modules/Metadata/Domain/MetadataService';
import { MetadataStorageAdapter } from './modules/Metadata/Adapters/Output/MetadataStorageAdapter';
import { MetadataEntity } from './modules/Metadata/Adapters/Output/Entity/MetadataEntity';
/** ALL BLOCKCHAIN POINTS MODULES IMPORT */
import { PointsBlockchainService } from './modules/Blockchain/Points/Domain/PointsBlockchainService';
import { PointsBlockchainAdapter } from './modules/Blockchain/Points/Adapters/Output/PointsBlockChainAdapter';
import { PointsBlockchainWebAdapter } from './modules/Blockchain/Points/Adapters/input/PointsBlockchainWebAdapter';
import { PointsDBStorageAdapter } from './modules/Blockchain/Points/Adapters/Output/PointsDBStorageAdapter';
/** ALL AUTHENTICATION MODULES IMPORT */
import { AuthenticationWebAdapter } from './modules/Authentication/Adapters/Input/AuthenticationWebAdapter';
import { AuthenticationService } from './modules/Authentication/Domain/AuthenticationService';
import { AuthenticationAdapter } from './modules/Authentication/Adapters/Output/AuthenticationAdapter';
/** ALL JWT MODULES IMPORT */
import { JwtStrategy } from './modules/Authentication/Strategies/Jwt.Strategy';
import { JwtAuthGuard } from './modules/Authentication/Guards/Auth.Guard';
/** ALL USER MODULES IMPORT */
import { UserWebAdapter } from './modules/User/Adapters/Input/UserWebAdapter';
import { UserService } from './modules/User/Domain/UserService';
import { UserAdapter } from './modules/User/Adapters/Output/UserAdapter';
import { UserEntity } from './modules/User/Adapters/Output/db/UserEntity';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: process.env.JWT_SECRET || '15151456121561651451',
			signOptions: { expiresIn: '260s' },
		}),
	],
	controllers: [
		ClientWebAdapter,
		PointsBlockchainWebAdapter,
		MetadataWebAdapter,
		CustomerDBWebAdapter,
		AuthenticationWebAdapter,
		UserWebAdapter,
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
		{
			useClass: UserService,
			provide: DependencyInjectionTokens.USER_TOKEN_USE_CASE,
		},
		{
			useClass: UserAdapter,
			provide: DependencyInjectionTokens.USER_TOKEN_OUTPUT_PORT,
		},
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

		BlockchainClientConnectionProvider,
		BlockchainPointsConnectionProvider,
		JwtStrategy,
		JwtAuthGuard,
	],
})
export class AppModule {}
