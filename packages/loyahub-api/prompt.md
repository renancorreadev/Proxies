Segue meu projeto e contexto: 

Estou implementando um projeto NestJS com arquitetura hexagonal na seguinte estrutura: 

src/modules 

```
└── 📁Blockchain
    └── 📁Client
        └── 📁Adapters
            └── 📁input
                └── ClientWebAdapter.ts
                └── CustomerDBWebAdapter.ts
            └── 📁Output
                └── 📁db
                    └── 📁entity
                        └── CustomerEntity.ts
                    └── CustomerDBAdapter.ts
                    └── CustomerDBStorageAdapter.ts
                └── ClientBlockChainAdapter.ts
        └── 📁Domain
            └── 📁Dto
                └── 📁HTTPRequest
                    └── ClientBlockchainRequestDto.ts
                └── 📁HTTPResponse
                    └── GetClientResponse.ts
                    └── LocationResponse.ts
            └── ClientBlockchainService.ts
            └── CustomerDBService.ts
        └── 📁Port
            └── 📁Input
                └── 📁db
                    └── CustomerDBStorageTokenUseCase.ts
                    └── CustomerDBTokenUseCase.ts
                └── ClientBlockchainTokenUseCase.ts
            └── 📁Output
                └── 📁db
                    └── CustomerDBStorageOutputPort.ts
                    └── CustomerDBTokenOutputPort.ts
                └── ClientBlockchainTokenOutputPort.ts
    └── 📁ERC20Manager
        └── 📁Adapters
            └── 📁Input
                └── ERC20ManagerBlockchainWebAdapter.ts
            └── 📁Output
                └── ERC20ManagerBlockchainAdapter.ts
        └── 📁Domain
            └── 📁Dto
                └── 📁HTTPRequest
                    └── get-balance-request-dto.ts
                └── 📁HTTPResponse
                    └── ERC20PromissesResponse.ts
            └── ERC20ManagerBlockchainService.ts
        └── 📁Port
            └── 📁Input
                └── ERC20ManagerBlockchainTokenUseCase.ts
            └── 📁Output
                └── ERC20ManagerBlockchainTokenOutputPort.ts
    └── 📁Points
        └── 📁Adapters
            └── 📁input
                └── PointsBlockchainWebAdapter.ts
            └── 📁Output
                └── PointsBlockChainAdapter.ts
                └── PointsDBStorageAdapter.ts
        └── 📁Domain
            └── 📁Dto
                └── 📁HTTPRequest
                    └── AddPointsRequestDto.ts
                    └── GetAllNFTsRequestDTO.ts
                └── 📁HTTPResponse
                    └── GetClientLevelResponse.ts
                    └── GetClientPointsResponse.ts
                    └── GetMultiplesNFTResponse.ts
                    └── GetUniqueNFTResponse.ts
            └── PointsBlockchainService.ts
        └── 📁Port
            └── 📁Input
                └── PointsBlockchainTokenUseCase.ts
            └── 📁Output
                └── PointsBlockchainTokenOutputPort.ts
                └── PointsDBStorageOutputPort.ts
```

src/config: 

```
└── 📁config
    └── 📁Blockchain
        └── connection.ts
    └── 📁Database
        └── DatabaseConnection.ts
```
src/helper/blockchain 

```
└── 📁blockchain
    └── 📁connector
        └── 📁interfaces
            └── IClientManagerConnector.ts
            └── IERC20ManagerConnector.ts
            └── index.ts
            └── IPointManagerConnector.ts
        └── ClientManagerConnector.ts
        └── ERC20ManagerConnector.ts
        └── index.ts
        └── PointManagerConnector.ts
    └── 📁types
        └── 📁contracts
            └── client-manager-types.ts
            └── erc20-manager-types.ts
            └── points-core-types.ts
    └── ClientManagerBlockchainConnector.ts
    └── ERC20ManagerBlockchainConnector.ts
    └── PointsCoreBlockchainConnector.ts
```

No app.module.ts  as dependencias e arquivos são injetados dessa forma: 

```ts
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
/** ALL BLOCKCHAIN ERC20 MODULES IMPORT */
import { ERC20ManagerBlockchainAdapter } from './modules/Blockchain/ERC20Manager/Adapters/Output/ERC20ManagerBlockchainAdapter';
import { ERC20ManagerBlockchainWebAdapter } from './modules/Blockchain/ERC20Manager/Adapters/Input/ERC20ManagerBlockchainWebAdapter';
import { ERC20ManagerBlockchainService } from './modules/Blockchain/ERC20Manager/Domain/ERC20ManagerBlockchainService';

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

import { Redis } from 'ioredis';
import { KeycloakAuthWebAdapter } from './modules/Authentication/Adapters/Input/AuthenticationKeycloakWebAdapter';
import { KeycloakAuthService } from './modules/Authentication/Domain/KeycloakAuthenticationService';
import { KeycloakAuthAdapter } from './modules/Authentication/Adapters/Output/KeycloakAdapter';
import { KeycloakStrategy } from './modules/Authentication/Strategies/KeycloakStrategy';

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
		ERC20ManagerBlockchainWebAdapter,
		MetadataWebAdapter,
		CustomerDBWebAdapter,
		AuthenticationWebAdapter,
		UserWebAdapter,
		KeycloakAuthWebAdapter,
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
			useClass: ERC20ManagerBlockchainService,
			provide: DependencyInjectionTokens.ERC20_MANAGER_BLOCKCHAIN_TOKEN_USE_CASE,
		},
		{
			useClass: ERC20ManagerBlockchainAdapter,
			provide: DependencyInjectionTokens.ERC20_MANAGER_BLOCKCHAIN_TOKEN_OUTPUT_PORT,
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
		{
			useClass: KeycloakAuthAdapter,
			provide: DependencyInjectionTokens.KEYCLOAK_TOKEN_OUTPUT_PORT,
		},
		{
			useClass: KeycloakAuthService,
			provide: DependencyInjectionTokens.KEYCLOAK_AUTH_SERVICE,
		},
		{
			useClass: KeycloakStrategy,
			provide: DependencyInjectionTokens.KEYCLOAK_STRATEGY,
		},
		{
			provide: DependencyInjectionTokens.REDIS_CLIENT,
			useFactory: () =>
				new Redis({
					host: process.env.REDIS_HOST || 'localhost',
					port: parseInt(process.env.REDIS_PORT) || 6379,
				}),
		},

		BlockchainClientConnectionProvider,
		BlockchainPointsConnectionProvider,
		JwtStrategy,
		JwtAuthGuard,
	],
})
export class AppModule {}
```

e os tokens de inversao de depencias são setados aqui em src/helper/AppConstants.ts 

```ts
export enum BaseUrls {
	API_BASE_URL = '/api/v1',
	ERC20_BLOCKCHAIN = 'erc20/',
	CLIENT_BLOCKCHAIN = 'client/',
	POINTS_BLOCKCHAIN = 'points/',
	META_DATA = 'metadata/',
	CUSTOMER = 'customer/',
	AUTH = 'auth/',
	USER = 'user/',
}

export const enum DependencyInjectionTokens {
	// Blockchain CustomerManagement Contract
	CLIENT_BLOCKCHAIN_TOKEN_USE_CASE = 'ClientBlockchainTokenUseCase',
	CLIENTBLOCKCHAIN_TOKEN_OUTPUT_PORT = 'ClientBlockchainTokenOutputPort',

	// Blockchain ERC20 Contract
	ERC20_MANAGER_BLOCKCHAIN_TOKEN_USE_CASE = 'ERC20ManagerBlockchainTokenUseCase',
	ERC20_MANAGER_BLOCKCHAIN_TOKEN_OUTPUT_PORT = 'ERC20ManagerBlockchainTokenOutputPort',

	//Blockchain Points Contract
	POINTS_BLOCKCHAIN_TOKEN_USE_CASE = 'PointsBlockchainTokenUseCase',
	POINTS_BLOCKCHAIN_TOKEN_OUTPUT_PORT = 'PointsBlockchainTokenOutputPort',
	POINTS_DB_STORAGE_OUTPUT_PORT = 'PointsDBStorageOutputPort',

	// Metadata
	METADATA_STORAGE_OUTPUT_PORT = 'MetadataStorageOutputPort',
	METADATA_TOKEN_OUTPUT_PORT = 'MetadataTokenOutputPort',
	METADATA_TOKEN_USE_CASE = 'MetadataTokenUseCase',

	// Customer
	CUSTOMER_SOURCE = 'CustomerSource',
	CUSTOMER_DB_STORAGE_OUTPUT_PORT = 'CustomerDBStorageOutputPort',
	CUSTOMER_DB_TOKEN_OUTPUT_PORT = 'CustomerDBTokenOutputPort',
	CUSTOMER_DB_TOKEN_USE_CASE = 'CustomerDBTokenUseCase',

	// Authentication
	AUTH_TOKEN_USE_CASE = 'AuthenticationTokenUseCase',
	AUTH_TOKEN_OUTPUT_PORT = 'AuthenticationTokenOutputPort',

	// User
	USER_TOKEN_USE_CASE = 'UserTokenUseCase',
	USER_TOKEN_OUTPUT_PORT = 'UserTokenOutputPort',

	// Vault
	VAULT_SERVICE = 'VaultServiceToken',

	// Keycloak
	KEYCLOAK_AUTH_SERVICE = 'KeycloakAuthService',
	KEYCLOAK_TOKEN_OUTPUT_PORT = 'KeycloakTokenOutputPort',
	KEYCLOAK_STRATEGY = 'KeycloakStrategy',

	// Redis
	REDIS_CLIENT = 'RedisClient',

	// Data Source
	DATA_SOURCE = 'DataSource',
}

export const enum DependencyInjectionBlockchainConnector {
	ERC20_MANAGER_CONNECTOR = 'ERC20ManagerConnector',
	CLIENT_MANAGER_CONNECTOR = 'ClientManagerConnector',
	POINTS_MANAGER_CONNECTOR = 'PointsManagerConnector',
	WALLET_CONNECTOR = 'WalletConnector',
}

export const enum Hosts {
	RPC_PROVIDER_URL = 'http://127.0.0.1:5100',
}
```

O ponto de partida é que desenvolvi o módulo ERC20Manager agora e esse módulo deve ter todas interações com contrato ERC20. 

Nas configurações atuais do ethers em config/Blockchain/connection.ts 

```ts
import { Provider } from '@nestjs/common';
import { DependencyInjectionBlockchainConnector } from '@helper/AppConstants';
import { PointsManagerConnector, ClientManagerConnector } from '@helper/blockchain/connector';
import { ERC20ManagerConnector } from '@helper/blockchain/connector/ERC20ManagerConnector';

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

export const BlockchainERC20ConnectionProvider: Provider = {
	provide: DependencyInjectionBlockchainConnector.ERC20_MANAGER_CONNECTOR,
	useFactory: (erc20ContractAddress: string, providerUrl: string, userPrivateKey: string): ERC20ManagerConnector => {
		return new ERC20ManagerConnector(erc20ContractAddress, providerUrl, userPrivateKey);
	},
	inject: [process.env.ERC20_CONTRACT_ADDRESS, process.env.PROVIDER],
};

```

Pode destacar que BlockchainPointsConnectionProvider e BlockchainClientConnectionProvider são os que possuem o provider padrão, ou seja, não possuem parametros extras para serem injetados. e ja iniciam os parametros padrões para serem usados no .env. 

Ao meu entender BlockchainERC20ConnectionProvider injeta e instancia o ERC20ManagerConnector que é o que possui as funcoes de interacao com o contrato ERC20.

ERC20ManagerConnector.ts
```ts
import { ERC20ManagerBlockchainConnector } from '../ERC20ManagerBlockchainConnector';
import { BalanceOfParam } from '../types/contracts/erc20-manager-types';

import { IERC20ManagerConnector } from './interfaces/IERC20ManagerConnector';

export class ERC20ManagerConnector extends ERC20ManagerBlockchainConnector implements IERC20ManagerConnector {
	async balanceOf(params: BalanceOfParam): Promise<number> {
		try {
			const { address } = params;
			const balance = await this.contract.balanceOf(address);

			return Number(balance);
		} catch (e) {
			console.error('Erro ao recuperar pontos do cliente:', e);

			const errorMessage = e instanceof Error ? e.message : 'Unknown error';
			throw new Error(`Erro na function balanceOf do contrato na EVM: ${errorMessage}`);
		}
	}
}

```

ERC20ManagerBlockchainConnector.ts
```ts
import { JsonRpcProvider, Wallet } from 'ethers';
import { Drex__factory, Drex } from 'loyahub-smart-contracts/typechain';

export class ERC20ManagerBlockchainConnector {
	protected contract: Drex;
	protected provider: JsonRpcProvider;
	protected wallet: Wallet;

	constructor(contractAddress: string, provider: string, privateKey: string) {
		this.provider = new JsonRpcProvider(provider);
		this.wallet = new Wallet(privateKey, this.provider);
		this.contract = Drex__factory.connect(contractAddress, this.wallet);
	}
}

```

Mas agora pra voce entender o contexto do uso voce pode ver os arquivos do modulo ERC20Manager que esta em src/modules/ERC20Manager

Adapters 
src/modules/Blockchain/ERC20Manager/Adapters/Input/ERC20ManagerBlockchainWebAdapter.ts
```ts
import {
	Body,
	Controller,
	Get,
	HttpException,
	Inject,
	Logger,
	// UseGuards,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	// ApiBearerAuth,
	ApiBody,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	// @ApiUnauthorizedResponse({ description: 'Unauthorized' }),
} from '@nestjs/swagger';
import { BaseUrls, DependencyInjectionTokens } from 'loyahub-api/src/helper/AppConstants';
import { ERC20ManagerBlockchainTokenUseCase } from '../../Port/Input/ERC20ManagerBlockchainTokenUseCase';
import { GetBalanceRequestDTO } from '../../Domain/Dto/HTTPRequest/get-balance-request-dto';

// import { JwtAuthGuard } from '@/src/modules/Authentication/Guards/Auth.Guard';

// @ApiBearerAuth('JWT-auth')
@Controller({
	path: BaseUrls.POINTS_BLOCKCHAIN,
})
@ApiTags('Blockchain ERC20 Manager Endpoints')
export class ERC20ManagerBlockchainWebAdapter {
	private readonly logger = new Logger('ERC20ManagerBlockchainWebAdapter');
	constructor(
		@Inject(DependencyInjectionTokens.ERC20_MANAGER_BLOCKCHAIN_TOKEN_OUTPUT_PORT)
		private erc20BlockchainService: ERC20ManagerBlockchainTokenUseCase,
	) {}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      GET DREX ERC20 BALANCE          ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Get Balance of Drex on ERC20',
		description: 'Esse Endpoint retorna o saldo DREX',
	})
	@ApiBody({ required: true, type: GetBalanceRequestDTO })
	@ApiOkResponse({
		description: 'Success operation',
		type: String,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	// @	// @ApiUnauthorizedResponse({ description: 'Unauthorized' })({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@ApiInternalServerErrorResponse({ description: 'Unexpected error' })
	// @UseGuards(JwtAuthGuard)
	@Get('balanceDrex')
	async getBalanceDrex(@Body() getBalanceRequestDto: GetBalanceRequestDTO): Promise<number> {
		try {
			this.logger.log('----------PROCESS BEGIN ----------');
			this.logger.log(`Running ERC20 Blockchain Web adapter`);
			this.logger.log(`Execution: balanceOf with params: ${JSON.stringify(getBalanceRequestDto)}`);

			const response = await this.erc20BlockchainService.getBalanceDrex(getBalanceRequestDto);

			this.logger.log('---------- PROCESS END ----------');
			return response;
		} catch (error) {
			this.logger.error(`Error in ERC20 Blockchain Service: ${JSON.stringify(error)}`);
			throw new HttpException('An error ocurred while adding the points', 500);
		}
	}
}

```

src/modules/Blockchain/ERC20Manager/Adapters/Output/ERC20ManagerBlockchainAdapter.ts
```ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';

import { DependencyInjectionBlockchainConnector } from '@helper/AppConstants';
import { ERC20ManagerBlockchainTokenOutputPort } from '../../Port/Output/ERC20ManagerBlockchainTokenOutputPort';
import { GetBalanceRequestDTO } from '../../Domain/Dto/HTTPRequest/get-balance-request-dto';

//@dev ERC20 Connector (Blockchain)
import { ERC20ManagerConnector } from '@helper/blockchain/connector/ERC20ManagerConnector';

config();

@Injectable()
export class ERC20ManagerBlockchainAdapter implements ERC20ManagerBlockchainTokenOutputPort {
	private readonly logger = new Logger('PointsBlockchainAdapter');

	constructor(
		@Inject(DependencyInjectionBlockchainConnector.ERC20_MANAGER_CONNECTOR)
		private contractInstance: ERC20ManagerConnector,
	) {}

	async balanceOf(params: GetBalanceRequestDTO): Promise<number> {
		try {
			const { address } = params;
			const balance = await this.contractInstance.balanceOf({ address });
			return balance;
		} catch (error) {
			const errorMessage = error.response ? error.response.data : error.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract balanceOf function on blockchain `);
		}
	}
}

```

Domain
src/modules/Blockchain/ERC20Manager/Domain/Dto/HTTPRequest/get-balance-request-dto.ts
```ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetBalanceRequestDTO {
	@ApiProperty({ type: String, required: true, example: 'Guarapari' })
	@IsNotEmpty()
	@IsString()
	address: string;
}

```

src/modules/Blockchain/ERC20Manager/Domain/Dto/HTTPResponse/ERC20PromissesResponse.ts
```ts

```

src/modules/Blockchain/ERC20Manager/Domain/ERC20ManagerBlockchainService.ts
```ts
import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from 'loyahub-api/src/helper/AppConstants';
import { ERC20ManagerBlockchainTokenUseCase } from '../Port/Input/ERC20ManagerBlockchainTokenUseCase';
import { GetBalanceRequestDTO } from './Dto/HTTPRequest/get-balance-request-dto';
import { ERC20ManagerBlockchainTokenOutputPort } from '../Port/Output/ERC20ManagerBlockchainTokenOutputPort';

@Injectable()
export class ERC20ManagerBlockchainService implements ERC20ManagerBlockchainTokenUseCase {
	private readonly logger = new Logger('ERC20ManagerBlockchainService');

	constructor(
		@Inject(DependencyInjectionTokens.ERC20_MANAGER_BLOCKCHAIN_TOKEN_OUTPUT_PORT)
		private readonly erc20ManagerBlockchainTokenAdapter: ERC20ManagerBlockchainTokenOutputPort,
	) {}

	/// @dev GETTERS
	async getBalanceDrex(params: GetBalanceRequestDTO): Promise<number> {
		try {
			const { address } = params;
			return await this.erc20ManagerBlockchainTokenAdapter.balanceOf({ address });
		} catch (e) {
			this.logger.error(`Error in Client Blockchain Service: ${JSON.stringify(e)}`);
			throw new Error('An error ocurred while get the client');
		}
	}
}

```

Ports
src/modules/Blockchain/ERC20Manager/Port/Input/ERC20ManagerBlockchainTokenUseCase.ts
```ts
import { GetBalanceRequestDTO } from '../../Domain/Dto/HTTPRequest/get-balance-request-dto';

export interface ERC20ManagerBlockchainTokenUseCase {
	getBalanceDrex(address: GetBalanceRequestDTO): Promise<number>;
}

```

src/modules/Blockchain/ERC20Manager/Port/Output/ERC20ManagerBlockchainTokenOutputPort.ts
```ts
import { GetBalanceRequestDTO } from '../../Domain/Dto/HTTPRequest/get-balance-request-dto';

export interface ERC20ManagerBlockchainTokenOutputPort {
	balanceOf(params: GetBalanceRequestDTO): Promise<number>;
}

```


Certo agora eu vou te explicar que essa mesmo api gera um wallet para um usuario cadastrado armazena o address no postgree e armazena a private key num serviço de vault em docker da hashicorp.

Preciso fazer uma integração interna para que o modulo ERC20Manager consiga extrair a private key do vault e usar para interagir com o contrato ERC20 na blockchain. 

O modulo de User segue o mesmo padrao ports, adapters e domain. 

```
└── 📁User
    └── 📁Adapters
        └── 📁Input
            └── UserWebAdapter.ts
        └── 📁Output
            └── 📁db
                └── UserEntity.ts
            └── UserAdapter.ts
    └── 📁Domain
        └── 📁@types
            └── user.ts
        └── 📁DTO
            └── 📁HTTPRequest
                └── userHttpRequest.ts
            └── 📁HTTPResponse
                └── userHttpResponse.ts
            └── 📁Swagger
                └── getUserResponseSwagger.ts
                └── index.ts
                └── LoginDtoSwagger.ts
                └── userUpdaterSwagger.ts
        └── 📁errors
            └── user.errors.ts
        └── UserService.ts
    └── 📁Port
        └── 📁Input
            └── UserTokenUseCase.ts
        └── 📁Output
            └── UserTokenOutputPort.ts
```


veja em src/modules/User/Adapters/Output/UserAdapter.ts como é feito o cadastro de um usuario e a geração da wallet.

```ts
// src/modules/Authentication/Adapters/Output/AuthenticationAdapter.ts
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './db/UserEntity';
import * as bcrypt from 'bcrypt';
import { WalletCreator } from '@helper/walletCreator';
import { storePrivateKeyInVault } from '@helper/vault';
import { InternalServerError, UserNotFoundError } from '../../Domain/errors/user.errors';
import { UserRegisterDTORequest } from '../../Domain/DTO/HTTPRequest/userHttpRequest';

import { UserData, UserInfo, UserUpdater } from '../../Domain/@types/user';
import { RegisterClientRequestDto } from '@/src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';
import { AddressLocal } from '@helper/blockchain/types/contracts/client-manager-types';
import axios from 'axios';
import { DependencyInjectionTokens } from '@helper/AppConstants';

@Injectable()
export class UserAdapter {
	constructor(@Inject(DependencyInjectionTokens.DATA_SOURCE) private readonly dataSource: DataSource) {}

	private readonly userRepository: Repository<UserEntity> = this.dataSource.getRepository(UserEntity);

	async register(registerUserDTO: UserRegisterDTORequest): Promise<UserData> {
		const { email, username, age, password, profileImageUrl, isAdmin, address } = registerUserDTO;
		if (!password) throw new InternalServerError('Password is required');
		if (!username) throw new InternalServerError('Username is required');
		if (!email) throw new InternalServerError('Email is required');

		const hashedPassword = await bcrypt.hash(password, 10);

		// 1. Cria uma nova carteira Ethereum
		const walletCreator = new WalletCreator();
		const { walletAddress, privateKey } = walletCreator.createNewEthereumWallet();
		if (!walletAddress || !privateKey) throw new InternalServerError('Failed to create a new Ethereum wallet.');

		const newUser = this.userRepository.create({
			email,
			username,
			password: hashedPassword,
			profileImageUrl,
			walletAddress,
			isAdmin,
		});

		// 2. Salva o novo usuário no banco de dados
		await this.userRepository.save(newUser);

		// 3. Armazena a chave privada no Vault
		await storePrivateKeyInVault(email, privateKey);

		// 5. Chama o método registerClient no serviço de blockchain
		await this.registerClient({
			name: username,
			age,
			WalletAddress: walletAddress,
			paymentStatus: 0,
			address: {
				Street: address.Street,
				City: address.City,
				PostalCode: address.PostalCode,
				HouseNumber: address.HouseNumber,
			},
		});

		const userCreated = {
			...newUser,
			privateKey,
		};

		return userCreated;
	}

	// Outros métodos
	async getUser(email: string): Promise<UserInfo | undefined> {
		const user = await this.userRepository.findOne({
			select: ['id', 'email', 'username', 'profileImageUrl', 'walletAddress', 'isAdmin', 'createdAt', 'updatedAt'],
			where: { email },
		});
		return user ?? undefined;
	}

	async deleteUser(email: string): Promise<string> {
		const user = await this.userRepository.findOne({ where: { email } });
		if (!user) throw new UserNotFoundError('User not found');
		const result = await this.userRepository.delete({ id: user.id });
		return result.affected === 1 ? 'User deleted successfully' : 'User not found';
	}

	async updateUser(email: string, updatedUserData: UserUpdater): Promise<UserData> {
		const user = await this.userRepository.findOne({ where: { email } });
		if (!user) throw new UserNotFoundError('User not found');

		const allowedUpdates = ['email', 'walletAddress', 'isAdmin'];
		allowedUpdates.forEach((field) => {
			if (field in updatedUserData) user[field] = updatedUserData[field];
		});

		await this.userRepository.save(user);
		return user;
	}

	private async registerClient(registerClientBlockchainDto: RegisterClientRequestDto): Promise<void> {
		try {
			const { name, age, WalletAddress, paymentStatus, address } = registerClientBlockchainDto;

			// Estrutura de dados para `address`, assegurando correspondência exata
			const addressPayload: AddressLocal = {
				City: address.City,
				Street: address.Street,
				PostalCode: address.PostalCode,
				HouseNumber: Number(address.HouseNumber),
			};

			// Dados do `payload`, correspondendo à estrutura JSON fornecida no `curl`
			const payload = {
				name,
				age,
				WalletAddress,
				paymentStatus,
				address: addressPayload,
			};

			// Configuração da requisição `axios`
			const config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: `${process.env.BASE_URL}/api/v1/client/new`,
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json',
				},
				data: JSON.stringify(payload),
			};

			const response = await axios.request(config);
			return response.data;
		} catch (error) {
			console.error('Erro ao registrar cliente na blockchain:', error);
			throw new Error('An error occurred in write contract registerClient function on blockchain');
		}
	}
}

```

pode ver em register que é gerado uma wallet e a private key é armazenada no vault. Eu preciso atualizar o modulo de User para trazer a private key do vault mas apenas a API deve ter acesso a private key. mais ninguem mais deve ter acesso. 

e em seguida o modulo de ERC20Manager deve ser atualizado para que ele consiga extrair a private key do vault e usar para interagir com o contrato ERC20 na blockchain.

lembrando que o vault ja esta configurado na api ja temos as variaveis de ambientes necessaria para ter a permissao pra consultar e criar novo registro. 

