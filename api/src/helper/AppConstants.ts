export enum BaseUrls {
	API_BASE_URL = '/api/elo/v1',
	AUTHORIZATION = 'Authorization/new',
	SETTLEMENT = 'Settlement/new',
	MANAGEMENT = 'Management',
	TRANSACTION = 'Transaction',
	REGISTER = 'Register',
	VALUES_TRANSFER = 'TransferValue/new',
	VALUES_TRANSFER_REMUNERATION = 'TransferRemuneration/new',
}

export const enum DependencyInjectionTokens {
	MANAGEMENT_USE_CASE = 'ManagementUseCase',
	TRANSACTION_USE_CASE = 'TransactionUseCase',
	AUTHORIZATION_TOKEN_USE_CASE = 'AuthorizationUseCase',
	SETTLEMENT_TOKEN_USE_CASE = 'SettlementTokenUseCase',
	VALUES_TRANSFER_USE_CASE = 'ValuesTransferUseCase',
	VALUES_TRANSFER_REMUNERATION_USE_CASE = 'ValuesTransferRemunerationUseCase',
	REMUNERATION_USE_CASE = 'RemunerationUseCase',
	REGISTER_USE_CASE = 'RegisterUseCase',
	DATA_SOURCE = 'DataSource',
	MANAGEMENT_OUTPUT_PORT = 'ManagementOutputPort',
	FIRE_FLY_OUTPUT_PORT = 'FireFlyOutputPort',
	AUTHORIZATION_TOKEN_OUTPUT_PORT = 'AuthorizationOutputPort',
	REGISTER_OUTPUT_PORT = 'RegisterOutputPort',
	TRANSACTION_OUTPUT_PORT = 'TransactionOutputPort',
	SETTLEMENT_TOKEN_OUTPUT_PORT = 'SettlementTokenOutputPort',
	REMUNERATION_OUTPUT_PORT = 'RemunerationOutputPort',
}

export const enum Hosts {
	RPC_PROVIDER_URL = 'http://127.0.0.1:5100',
}

export const enum Decimals {
	VALUE = 18,
}

export enum AccreditorEnum {
	CIELO = 'cielo',
	GET_NET = 'getnet',
	STONE = 'stone',
}

export const FireflyHost = {
	NodeELO: {
		host: '127.0.0.1',
		port: '5000',
		managementInterfaceName: 'ManagementContract',
	},
	NodeCielo: {
		host: '127.0.0.1',
		port: '5001',
	},
	NodeGetNet: {
		host: '127.0.0.1',
		port: '5002',
	},
	NodeStone: {
		host: '127.0.0.1',
		port: '5003',
	},
};

export const enum NodesAccreditorEnum {
	NODE_2_CIELO = 'http://127.0.0.1:5001',
	NODE_3_GET_NET = 'http://127.0.0.1:5002',
	NODE_4_STONE = 'http://127.0.0.1:5003',
}
