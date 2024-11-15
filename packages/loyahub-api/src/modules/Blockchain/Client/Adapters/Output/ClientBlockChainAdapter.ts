import { Inject, Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';

import { ClientBlockchainTokenOutputPort } from '@/src/modules/Blockchain/Client/Port/Output/ClientBlockchainTokenOutputPort';
import { RegisterClientRequestDto } from '@/src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';
import { DependencyInjectionBlockchainConnector, DependencyInjectionTokens } from '@helper/AppConstants';
import { ClientManagerConnector } from '@helper/blockchain/connector';
import { AddressLocal, ClientData, ClientDataInput } from '@helper/blockchain/types/contracts/client-manager-types';
import axios from 'axios';

import { CustomerDBService } from '../../Domain/CustomerDBService';

config();

@Injectable()
export class ClientBlockchainAdapter implements ClientBlockchainTokenOutputPort {
	private readonly logger = new Logger('ClientBlockchainAdapter');

	constructor(
		@Inject(DependencyInjectionTokens.CUSTOMER_DB_TOKEN_USE_CASE)
		private readonly customerDBService: CustomerDBService,

		@Inject(DependencyInjectionBlockchainConnector.CLIENT_MANAGER_CONNECTOR)
		private readonly contractInstance: ClientManagerConnector,
	) {}

	async registerClient(registerClientBlockchainDto: RegisterClientRequestDto): Promise<any> {
		try {
			const { name, age, walletAddress, paymentStatus, address } = registerClientBlockchainDto;

			const addressLocal: AddressLocal = {
				City: address.City,
				Street: address.Street,
				PostalCode: Number(address.PostalCode),
				HouseNumber: Number(address.HouseNumber),
			};
			const payload: ClientDataInput = {
				name,
				age,
				walletAddress,
				paymentStatus,
				addressLocal,
			};
			const tx = await this.contractInstance.registerClient(payload);

			if (tx.hash) {
				await this.customerDBService.saveCustomer(payload); // salva no banco
				await this.initializeMetadata(registerClientBlockchainDto); // cria uma metadata
			} else {
				throw new Error('An error ocurred in write contract registerClient function on blockchain ');
			}

			return;
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in write contract registerClient function on blockchain `);
		}
	}

	async getAllCustomers(): Promise<ClientData[]> {
		try {
			console.log('caiu aqui nessa merda de clientAdapter');
			return await this.customerDBService.findAll();
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An Error ocurred in read contract getAllCustomers on application `);
		}
	}

	async getClientData(clientId: number): Promise<ClientData> {
		try {
			return await this.contractInstance.getClientData(clientId);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract getClientData on blockchain `);
		}
	}

	async getClientByName(name: string): Promise<ClientData> {
		try {
			return await this.contractInstance.getClientByName(name);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract getClientByName on blockchain `);
		}
	}

	async getClientByAge(age: number): Promise<ClientData> {
		try {
			return await this.contractInstance.getClientByAge(age);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract getClientByAge on blockchain `);
		}
	}

	async getClientByWallet(Wallet: string): Promise<ClientData> {
		try {
			return await this.contractInstance.getClientByWallet(Wallet);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract getClientByWallet on blockchain `);
		}
	}

	async getCurrentId(): Promise<number> {
		try {
			return await this.contractInstance.getCurrentId();
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract getCurrentId on blockchain `);
		}
	}

	private async initializeMetadata(registerClientBlockchainDto: RegisterClientRequestDto) {
		const { name } = registerClientBlockchainDto;

		const { clientID } = await this.getClientByName(name);

		try {
			const data = JSON.stringify({
				tokenID: clientID,
				customer: name,
				description: 'Voce ainda não alcançou nenhuma insignia e nenhum nivel',
				image:
					'https://github.com/renancorreadev/loyahub/blob/develop/docs/images/Insignias/CustomerPremium.png?raw=true',
				insight: 'sem insignia',
				attributes: [
					{
						type: 'level_type',
						value: 0,
					},
					{
						type: 'nft_type',
						value: 'Sem NFT',
					},
					{
						type: 'benefit_type',
						value: [],
					},
				],
				id: clientID,
				createdAt: new Date().toISOString(), // Data de criação atual
				updatedAt: new Date().toISOString(), // Data de atualização atual
			});

			const config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: `${process.env.BASE_URL}/api/v1/metadata/new`,
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json',
				},
				data: data,
			};

			const response = await axios.request(config);

			return response.data;
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract setMetadata on blockchain `);
		}
	}
}
