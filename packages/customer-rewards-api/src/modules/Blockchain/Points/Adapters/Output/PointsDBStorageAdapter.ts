import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DependencyInjectionTokens } from '@src/helper/AppConstants';

import { ApplicationError, ContractError } from '@helper/APIErrors';
import { PointsDBStorageOutputPort } from '../../Port/Output/PointsDBStorageOutputPort';
import { CustomerEntity } from '../../../Client/Adapters/Output/db/entity/CustomerEntity';

export interface PointData {
	clientId: number;
	points: number;
}

@Injectable()
export class PointsDBStorageAdapter implements PointsDBStorageOutputPort {
	private readonly logger = new Logger('PointsStorageAdapter');
	private readonly pontsDBRepository: Repository<CustomerEntity>;

	constructor(
		@Inject(DependencyInjectionTokens.DATA_SOURCE)
		private readonly dataSource: DataSource,
	) {
		this.pontsDBRepository = dataSource.getRepository(CustomerEntity);
	}
	async savePointOnDb(pointsDTO: PointData): Promise<string> {
		try {
			const customer = await this.pontsDBRepository.findOneBy({ clientID: pointsDTO.clientId });
			if (!customer) {
				throw new ApplicationError({ code: HttpStatus.NOT_FOUND, message: 'Customer not found' });
			}
			customer.points = pointsDTO.points;
			await this.pontsDBRepository.save(customer);
			return 'Points saved successfully on db';
		} catch (error) {
			this.logger.error(`Error in savePointOnDb: ${JSON.stringify(error)}`);
			throw new ContractError(`An error occurred while saving points: ${error.message}`);
		}
	}
	async getPointOnDb(clientId: number): Promise<PointData> {
		try {
			const customer = await this.pontsDBRepository.findOneBy({ clientID: clientId });
			if (!customer) {
				throw new ApplicationError({ code: HttpStatus.NOT_FOUND, message: 'Customer not found' });
			}
			return { clientId: customer.clientID, points: customer.points };
		} catch (error) {
			this.logger.error(`Error when getting the points: ${JSON.stringify(error)}`);
			throw new ContractError(`An error occurred while getting the points: ${error.message}`);
		}
	}

	async deletePointsOnDb(clientId: number, pointsToDelete: number): Promise<string> {
		try {
			const customer = await this.pontsDBRepository.findOneBy({ clientID: clientId });
			if (!customer) {
				throw new ApplicationError({ code: HttpStatus.NOT_FOUND, message: 'Customer not found' });
			}

			// Certifique-se de que os pontos a serem deletados não sejam negativos ou maiores que os pontos atuais do cliente
			if (pointsToDelete < 0 || pointsToDelete > customer.points) {
				throw new ApplicationError({
					code: HttpStatus.BAD_REQUEST,
					message: 'Invalid points to delete',
				});
			}

			customer.points -= pointsToDelete;
			await this.pontsDBRepository.save(customer);
			return `Deleted ${pointsToDelete} points successfully`;
		} catch (error) {
			this.logger.error(`Error in deletePointsOnDb: ${JSON.stringify(error)}`);
			throw new ContractError(`An error occurred while deleting points: ${error.message}`);
		}
	}
}
