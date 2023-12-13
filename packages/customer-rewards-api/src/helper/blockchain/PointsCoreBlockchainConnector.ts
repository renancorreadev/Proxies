import { JsonRpcProvider, Wallet } from 'ethers';
import { PointCore__factory, PointCore } from '@smart-contracts';

export class PointCoreBlockchainConnector {
	protected contract: PointCore;
	protected provider: JsonRpcProvider;
	protected wallet: Wallet;

	constructor(contractAddress: string, provider: string, privateKey: string) {
		this.provider = new JsonRpcProvider(provider);
		this.wallet = new Wallet(privateKey, this.provider);
		this.contract = PointCore__factory.connect(contractAddress, this.wallet);
	}
}
