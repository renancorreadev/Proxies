import { Inject, Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';

import { ClientBlockchainTokenOutputPort } from '@/src/modules/Blockchain/Client/Port/Output/ClientBlockchainTokenOutputPort';
import { RegisterClientRequestDto } from '@/src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';
import { DependencyInjectionBlockchainConnector } from '@helper/AppConstants';
import { ClientManagerConnector } from '@helper/blockchain/connector';
import { AddressLocal, ClientData, ClientDataInput } from '@helper/blockchain/types/contracts/client-manager-types';
import axios from 'axios';

config();

interface CustomerData {
	tokenID: number;
	customer: string;
	description: string;
	image: string;
	insight: string;
	attributes: CustomerAttributes;
}

interface CustomerAttributes {
	level: number;
	points: number;
	benefits: Benefit[];
}

interface Benefit {
	level_type?: string;
	value?: string | number | BenefitValue[];
	nft_type?: string;
	benefit_type?: string;
}

interface BenefitValue {
	discount?: string;
	description: string;
	freeFrete?: string;
	promotionLevel?: string;
}

@Injectable()
export class ClientBlockchainAdapter implements ClientBlockchainTokenOutputPort {
	private readonly logger = new Logger('ClientBlockchainAdapter');

	constructor(
		@Inject(DependencyInjectionBlockchainConnector.CLIENT_MANAGER_CONNECTOR)
		private contractInstance: ClientManagerConnector,
	) {}

	async registerClient(registerClientBlockchainDto: RegisterClientRequestDto): Promise<any> {
		try {
			const { name, age, WalletAddress, paymentStatus, address } = registerClientBlockchainDto;

			const addressLocal: AddressLocal = {
				City: address.City,
				Street: address.Street,
				PostalCode: address.PostalCode,
				HouseNumber: Number(address.HouseNumber),
			};
			const payload: ClientDataInput = {
				name,
				age,
				WalletAddress,
				paymentStatus,
				addressLocal,
			};
			const tx = await this.contractInstance.registerClient(payload);

			if (tx.hash) {
				await this.initializeMetadata(registerClientBlockchainDto);
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

	private async initializeMetadata(registerClientBlockchainDto: RegisterClientRequestDto) {
		const { name } = registerClientBlockchainDto;

		const { clientID } = await this.getClientByName(name);

		try {
			let data = JSON.stringify({
				tokenID: clientID,
				customer: name,
				description: 'Voce ainda não alcançou nenhuma insignia e nenhum nivel',
				image: 'https://meusite.com/imagens/nft/1.png',
				insight: 'sem insignia',
				attributes: {
					level: 0,
					points: 0,
					benefits: [
						{
							level_type: 'Nível',
							value: 0,
						},
						{
							nft_type: 'NFT',
							value: 'Sem NFT',
						},
						{
							benefit_type: 'Benefits',
							value: [],
						},
					],
				},
			});

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: `${process.env.BASE_URL}//api/v1/metadata/new`,
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
