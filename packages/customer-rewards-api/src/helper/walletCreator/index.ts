import { ethers } from 'ethers';

export class WalletCreator {
	public createNewEthereumWallet() {
		const newWallet = ethers.Wallet.createRandom();
		const privateKey = newWallet.privateKey;
		const walletAddress = newWallet.address;

		return {
			privateKey: privateKey,
			walletAddress: walletAddress,
		};
	}
}
