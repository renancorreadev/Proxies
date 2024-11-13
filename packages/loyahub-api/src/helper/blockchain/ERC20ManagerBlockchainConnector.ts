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
