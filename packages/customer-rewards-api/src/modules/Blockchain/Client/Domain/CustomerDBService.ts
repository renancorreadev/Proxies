/**
 * Represents a service for registering clients in a blockchain.
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from 'customer-rewards-api/src/helper/AppConstants';

import { ClientData, ClientDataInput } from '@helper/blockchain/types/contracts/client-manager-types';
import { CustomerDBTokenUseCase } from '../Port/Input/db/CustomerDBTokenUseCase';
import { CustomerDBTokenOutputPort } from '../Port/Output/db/CustomerDBTokenOutputPort';

@Injectable()
export class CustomerDBService implements CustomerDBTokenUseCase {
	private readonly logger = new Logger('ClientBlockchainService');

	constructor(
		@Inject(DependencyInjectionTokens.CUSTOMER_DB_TOKEN_OUTPUT_PORT)
		private readonly customerDBTokenAdapter: CustomerDBTokenOutputPort,
	) {}

	async findAll(): Promise<ClientData[]> {
		try {
			return await this.customerDBTokenAdapter.findAll();
		} catch (e) {
			this.logger.error(`Error in Client Blockchain Service: ${JSON.stringify(e)}`);
			throw new Error('An error ocurred while get the client on db service');
		}
	}

	async saveCustomer(clientDataInput: ClientDataInput): Promise<string> {
		try {
			await this.customerDBTokenAdapter.saveCustomer(clientDataInput);
			return 'Cliente registrado com sucesso!';
		} catch (e) {
			this.logger.error(`Error in Client Blockchain Service: ${JSON.stringify(e)}`);
			throw new Error('An error ocurred while creating the client');
		}
	}

	async getCustomer(clientId: number): Promise<ClientData> {
		try {
			return await this.customerDBTokenAdapter.getCustomer(clientId);
		} catch (e) {
			this.logger.error(`Error in Client Blockchain Service: ${JSON.stringify(e)}`);
			throw new Error('An error ocurred while get the client on db service');
		}
	}
}
