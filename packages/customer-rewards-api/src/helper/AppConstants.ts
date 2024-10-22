export enum BaseUrls {
	API_BASE_URL = '/api/v1',
	CLIENT_BLOCKCHAIN = 'client/',
	POINTS_BLOCKCHAIN = 'points/',
	META_DATA = 'metadata/',
	CUSTOMER = 'customer/',
	AUTH = 'auth/',
	USER = 'user/',
}

export const enum DependencyInjectionTokens {
	// Blockchain
	CLIENT_BLOCKCHAIN_TOKEN_USE_CASE = 'ClientBlockchainTokenUseCase',
	CLIENTBLOCKCHAIN_TOKEN_OUTPUT_PORT = 'ClientBlockchainTokenOutputPort',
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
	CLIENT_MANAGER_CONNECTOR = 'ClientManagerConnector',
	POINTS_MANAGER_CONNECTOR = 'PointsManagerConnector',
	WALLET_CONNECTOR = 'WalletConnector',
}

export const enum Hosts {
	RPC_PROVIDER_URL = 'http://127.0.0.1:5100',
}
