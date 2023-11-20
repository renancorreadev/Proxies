import { Inject, Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';

import { ClientBlockchainTokenOutputPort } from '@/src/modules/blockchain/Client/Port/Output/ClientBlockchainTokenOutputPort';
import { RegisterClientRequestDto } from '@/src/modules/blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';
import { DependencyInjectionBlockchainConnector } from '@helper/AppConstants';
import { ClientManagerConnector } from '@helper/blockchain/connector';
import { AddressLocal, ClientData } from '@helper/blockchain/types/contracts/client-manager-types';

config();

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
			const payload: ClientData = {
				name,
				age,
				WalletAddress,
				paymentStatus,
				addressLocal,
			};

			return await this.contractInstance.registerClient(payload);
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
}
