import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CustomerEntity } from './entity/CustomerEntity';

import { ApplicationError, ContractError } from '@helper/APIErrors';
import { ClientData, ClientDataInput } from '@helper/blockchain/types/contracts/client-manager-types';
import { DependencyInjectionTokens } from '@helper/AppConstants';
import { CustomerDBStorageOutputPort } from '../../../Port/Output/db/CustomerDBStorageOutputPort';

@Injectable()
export class CustomerDBStorageStorageAdapter implements CustomerDBStorageOutputPort {
	private readonly logger = new Logger('CustomerDBStorageStorageAdapter');
	private readonly customerRepository: Repository<CustomerEntity>;

	constructor(
		@Inject(DependencyInjectionTokens.DATA_SOURCE)
		private readonly dataSource: DataSource,
	) {
		this.customerRepository = dataSource.getRepository(CustomerEntity);
	}

	async findAll(): Promise<ClientData[]> {
		try {
			return await this.customerRepository.find();
		} catch (error) {
			this.logger.error(`Error when getting all customers with Query Builder: ${JSON.stringify(error)}`);
			throw new ContractError(`An error occurred while getting all customers with Query Builder: ${error.message}`);
		}
	}

	async saveCustomer(clientDataInput: ClientDataInput): Promise<ClientData> {
		try {
			const newCustomer = this.customerRepository.create(clientDataInput);
			return await this.customerRepository.save(newCustomer);
		} catch (error) {
			this.logger.error(`Error in saving customer: ${JSON.stringify(error)}`);
			throw new ContractError(`An error occurred while saving customer: ${error.message}`);
		}
	}

	async getCustomer(clientID: number): Promise<ClientData> {
		try {
			const customer = await this.customerRepository.findOne({ where: { clientID } });
			if (!customer) {
				throw new ApplicationError({
					code: HttpStatus.NOT_FOUND,
					message: `Customer not found with clientID: ${clientID}`,
				});
			}
			return customer;
		} catch (error) {
			this.logger.error(`Error when getting customer: ${JSON.stringify(error)}`);
			throw new ContractError(`An error occurred while getting customer: ${error.message}`);
		}
	}
}
