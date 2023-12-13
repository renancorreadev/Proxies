import { ClientManagerBlockchainConnector } from '@helper/blockchain/ClientManagerBlockchainConnector';
import { expect } from 'chai';
import { JsonRpcProvider, Wallet } from 'ethers';

import { config } from 'dotenv';

config();
describe('ClientManagerBlockchainConnector', () => {
	let contractAddress: string;
	let providerUrl: string;
	let privateKey: string;
	let connector: ClientManagerBlockchainConnector;
	let wallet: Wallet;

	// Antes de cada teste, configure os valores iniciais e crie uma instância do PointCoreBlockchainConnector
	beforeEach(() => {
		contractAddress = process.env.CONTRACT_ADDRESS as string;
		providerUrl = process.env.PROVIDER as string;
		privateKey = process.env.PRIVATE_KEY as string;

		const provider = new JsonRpcProvider(providerUrl);
		wallet = new Wallet(privateKey, provider);

		connector = new ClientManagerBlockchainConnector(contractAddress, providerUrl, privateKey);
	});

	it('deve criar uma instância válida de ClientManagerBlockchainConnector', () => {
		expect(connector).to.be.an.instanceOf(ClientManagerBlockchainConnector);
	});
});
