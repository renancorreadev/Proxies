import { Inject, Injectable, Logger } from '@nestjs/common';
import { DependencyInjectionTokens } from '@src/helper/AppConstants';

import { CustomerDBTokenOutputPort } from '../../../Port/Output/db/CustomerDBTokenOutputPort';
import { CustomerDBStorageOutputPort } from '../../../Port/Output/db/CustomerDBStorageOutputPort';
import { ClientData, ClientDataInput } from '@helper/blockchain/types/contracts/client-manager-types';

@Injectable()
export class CustomerDBAdapter implements CustomerDBTokenOutputPort {
	private readonly logger = new Logger(CustomerDBAdapter.name);

	constructor(
		@Inject(DependencyInjectionTokens.CUSTOMER_DB_STORAGE_OUTPUT_PORT)
		private customerStorageDB: CustomerDBStorageOutputPort,
	) {}

	async findAll(): Promise<ClientData[]> {
		try {
			return await this.customerStorageDB.findAll();
		} catch (error) {
			this.logger.error(`Error in findAll customerDBAdapter: ${JSON.stringify(error)}`);
			throw error;
		}
	}

	async saveCustomer(clientDataInput: ClientDataInput): Promise<string> {
		try {
			await this.customerStorageDB.saveCustomer(clientDataInput);
			return 'The customer was successfully registered on Database';
		} catch (error) {
			this.logger.error(`Error while trying to saveCustomer: ${error}`);
			throw new Error(`Error while trying to saveCustomer: ${error}`);
		}
	}

	async getCustomer(clientID: number): Promise<ClientData> {
		try {
			return await this.customerStorageDB.getCustomer(clientID);
		} catch (error) {
			this.logger.error(`Error in get getCustomer customerDBAdapter: ${JSON.stringify(error)}`);
			throw error;
		}
	}
}
