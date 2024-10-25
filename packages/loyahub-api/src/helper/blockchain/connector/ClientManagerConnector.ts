import { ClientManagerBlockchainConnector } from '@helper/blockchain/ClientManagerBlockchainConnector';
import { ClientData, ClientDataInput } from '@client-manager-contract-types/';
import { IClientManagerConnector } from './interfaces/IClientManagerConnector';
import { ContractTransactionReceipt } from 'ethers';

export class ClientManagerConnector extends ClientManagerBlockchainConnector implements IClientManagerConnector {
	// Setters blockchain States
	async registerClient(params: ClientDataInput): Promise<ContractTransactionReceipt> {
		try {
			const { name, age, WalletAddress, paymentStatus, addressLocal } = params;
			const tx = await this.contract.registerClient(
				{
					name,
					age,
					WalletAddress,
					paymentStatus,
					addressLocal,
				},
				{
					gasLimit: 500000,
					gasPrice: 0,
				},
			);

			return await tx.wait();
		} catch (e) {
			console.error('Erro ao registrar cliente na blockchain:', e);

			const errorMessage = e instanceof Error ? e.message : 'Unknown error';
			throw new Error(`Erro ao escrever na função registerClient do contrato na EVM: ${errorMessage}`);
		}
	}

	// Getters blockchain States
	async getClientData(clientId: number): Promise<ClientData> {
		try {
			const rawData = await this.contract.getClientData(clientId);

			// Transforming the data to object readable
			const formattedData: ClientData = {
				clientID: parseInt(rawData[0].toString()),
				name: rawData[1],
				age: parseInt(rawData[2].toString()),
				WalletAddress: rawData[3],
				paymentStatus: parseInt(rawData[4].toString()),
				addressLocal: {
					City: rawData[5][0],
					Street: rawData[5][1],
					PostalCode: parseInt(rawData[5][2].toString()),
					HouseNumber: parseInt(rawData[5][3].toString()),
				},
			};

			return formattedData;
		} catch (e) {
			throw new Error(`An error ocurred in read contract getClientData on blockchain evm true `);
		}
	}

	async getClientByName(name: string): Promise<ClientData> {
		try {
			const rawData = await this.contract.getClientsByName(name);

			// Transforming the data to object readable
			const formattedData: ClientData = {
				clientID: parseInt(rawData[0].toString()),
				name: rawData[1],
				age: parseInt(rawData[2].toString()),
				WalletAddress: rawData[3],
				paymentStatus: parseInt(rawData[4].toString()),
				addressLocal: {
					City: rawData[5][0],
					Street: rawData[5][1],
					PostalCode: parseInt(rawData[5][2].toString()),
					HouseNumber: parseInt(rawData[5][3].toString()),
				},
			};

			return formattedData;
		} catch (e) {
			throw new Error(`An error ocurred in read contract getClientByName on blockchain evm `);
		}
	}

	async getClientByAge(age: number): Promise<ClientData> {
		try {
			const rawData = await this.contract.getClientsByAge(age);

			// Transforming the data to object readable
			const formattedData: ClientData = {
				clientID: parseInt(rawData[0].toString()),
				name: rawData[1],
				age: parseInt(rawData[2].toString()),
				WalletAddress: rawData[3],
				paymentStatus: parseInt(rawData[4].toString()),
				addressLocal: {
					City: rawData[5][0],
					Street: rawData[5][1],
					PostalCode: parseInt(rawData[5][2].toString()),
					HouseNumber: parseInt(rawData[5][3].toString()),
				},
			};

			return formattedData;
		} catch (error) {
			console.error(error);
			throw new Error(`An error ocurred in read contract getClientByAge on blockchain evm: ${error.message}`);
		}
	}

	async getClientByWallet(wallet: string): Promise<ClientData> {
		try {
			const rawData = await this.contract.getClientsByAddress(wallet);

			// Transforming the data to object readable

			const formattedData: ClientData = {
				clientID: parseInt(rawData[0].toString()),
				name: rawData[1],
				age: parseInt(rawData[2].toString()),
				WalletAddress: rawData[3],
				paymentStatus: parseInt(rawData[4].toString()),
				addressLocal: {
					City: rawData[5][0],
					Street: rawData[5][1],
					PostalCode: parseInt(rawData[5][2].toString()),
					HouseNumber: parseInt(rawData[5][3].toString()),
				},
			};

			return formattedData;
		} catch (error) {
			console.error(error);
			throw new Error(`An error ocurred in read contract getClientByWallet on blockchain evm: ${error.message}`);
		}
	}

	async getCurrentId(): Promise<number> {
		try {
			const lastId = await this.contract.currentId();

			return Number(lastId);
		} catch (error) {
			console.error(error);
			throw new Error(`An error ocurred in read contract getLastClientID on blockchain evm: ${error.message}`);
		}
	}
}
