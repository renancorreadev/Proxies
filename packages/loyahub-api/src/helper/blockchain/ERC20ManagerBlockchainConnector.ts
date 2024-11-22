import { ethers } from 'ethers';
import { Drex__factory, Drex } from 'loyahub-smart-contracts/typechain';

export class ERC20ManagerBlockchainConnector {
	protected contract: Drex;
	protected provider: ethers.JsonRpcProvider;

	constructor(contractAddress: string, providerUrl: string) {
		this.provider = new ethers.JsonRpcProvider(providerUrl);
		this.contract = Drex__factory.connect(contractAddress, this.provider);
	}
}
