import { ethers } from 'ethers';

export interface IERC20ManagerConnector {
	balanceOf(address: string): Promise<number>;
	approve(
		email: string,
		sender: string,
		spender: string,
		value: ethers.BigNumberish,
		signServiceUrl: string,
	): Promise<{ transactionHash: string }>;

	transfer(
		email: string,
		sender: string,
		to: string,
		value: ethers.BigNumberish,
		signServiceUrl: string,
	): Promise<{ transactionHash: string }>;

	transferFrom(
		email: string,
		sender: string,
		from: string,
		to: string,
		value: ethers.BigNumberish,
		signServiceUrl: string,
	): Promise<{ transactionHash: string }>;
}
