import { PointCoreBlockchainConnector } from '@helper/blockchain/PointsCoreBlockchainConnector';
import { expect } from 'chai';
import { JsonRpcProvider, Wallet } from 'ethers';

describe('PointCoreBlockchainConnector', () => {
	let contractAddress: string;
	let providerUrl: string;
	let privateKey: string;
	let connector: PointCoreBlockchainConnector;
	let wallet: Wallet;

	// Antes de cada teste, configure os valores iniciais e crie uma instância do PointCoreBlockchainConnector
	beforeEach(() => {
		contractAddress = process.env.CONTRACT_ADDRESS as string;
		providerUrl = process.env.PROVIDER as string;
		privateKey = process.env.PRIVATE_KEY as string;

		const provider = new JsonRpcProvider(providerUrl);
		wallet = new Wallet(privateKey, provider);

		connector = new PointCoreBlockchainConnector(contractAddress, providerUrl, privateKey);
	});

	it('deve criar uma instância válida de PointCoreBlockchainConnector', () => {
		expect(connector).to.be.an.instanceOf(PointCoreBlockchainConnector);
	});
});
