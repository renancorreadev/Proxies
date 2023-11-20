export enum BaseUrls {
	API_BASE_URL = '/api/v1',
	CLIENT_BLOCKCHAIN = 'client/',
	POINTS_BLOCKCHAIN = 'points/',
}

export const enum DependencyInjectionTokens {
	CLIENT_BLOCKCHAIN_TOKEN_USE_CASE = 'ClientBlockchainTokenUseCase',
	CLIENTBLOCKCHAIN_TOKEN_OUTPUT_PORT = 'ClientBlockchainTokenOutputPort',
	POINTS_BLOCKCHAIN_TOKEN_USE_CASE = 'PointsBlockchainTokenUseCase',
	POINTS_BLOCKCHAIN_TOKEN_OUTPUT_PORT = 'PointsBlockchainTokenOutputPort',
}

export const enum DependencyInjectionBlockchainConnector {
	CLIENT_MANAGER_CONNECTOR = 'ClientManagerConnector',
	POINTS_MANAGER_CONNECTOR = 'PointsManagerConnector',
}

export const enum Hosts {
	RPC_PROVIDER_URL = 'http://127.0.0.1:5100',
}
