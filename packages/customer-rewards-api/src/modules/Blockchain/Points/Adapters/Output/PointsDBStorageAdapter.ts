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
	async addPointsOnDb(clientId: number, pointsToAdd: number): Promise<string> {
		try {
			// Encontre o cliente pelo ID
			const customer = await this.pontsDBRepository.findOne({
				where: { clientID: clientId },
			});
			if (!customer) {
				throw new ApplicationError({ code: HttpStatus.NOT_FOUND, message: 'Customer not found' });
			}

			// Certifique-se de que os pontos a serem adicionados não sejam negativos
			if (pointsToAdd < 0) {
				throw new ApplicationError({
					code: HttpStatus.BAD_REQUEST,
					message: 'Invalid points to add',
				});
			}

			// Adicione os pontos ao cliente
			customer.points += pointsToAdd;

			// Salve as alterações no banco de dados
			await this.pontsDBRepository.save(customer);

			return `Added ${pointsToAdd} points successfully`;
		} catch (error) {
			this.logger.error(`Error in addPointsOnDb: ${JSON.stringify(error)}`);
			throw new ContractError(`An error occurred while adding points: ${error.message}`);
		}
	}

	async deletePointsOnDb(clientId: number, pointsToDelete: number): Promise<string> {
		try {
			const customer = await this.pontsDBRepository.findOne({
				where: { clientID: clientId },
			});

			if (!customer) {
				throw new ApplicationError({ code: HttpStatus.NOT_FOUND, message: 'Customer not found' });
			}

			if (pointsToDelete < 0) {
				throw new ApplicationError({
					code: HttpStatus.BAD_REQUEST,
					message: 'Invalid points to delete',
				});
			}

			if (pointsToDelete > customer.points) {
				throw new ApplicationError({
					code: HttpStatus.BAD_REQUEST,
					message: 'Points to delete exceed current points',
				});
			}

			// Subtraia os pontos do cliente
			customer.points -= pointsToDelete;

			// Salve as alterações no banco de dados
			await this.pontsDBRepository.save(customer);

			return `Deleted ${pointsToDelete} points successfully`;
		} catch (error) {
			this.logger.error(`Error in deletePointsOnDb: ${JSON.stringify(error)}`);
			throw new ContractError(`An error occurred while deleting points: ${error.message}`);
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
}
