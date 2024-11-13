import { ERC20ManagerConnector } from './connector/ERC20ManagerConnector';

export const transferERC20 = async (email: string, amount: number) => {
	const { ERC20_CONTRACT_ADDRESS, PROVIDER, PRIVATE_KEY } = process.env;
	const drexContractInstance = new ERC20ManagerConnector(ERC20_CONTRACT_ADDRESS, PROVIDER, PRIVATE_KEY);

	const { hash } = await drexContractInstance.transferERC20({ to: email, amount });

	if (!hash) {
		throw new Error('Erro ao transferir token Drex');
	}

	return hash;
};
