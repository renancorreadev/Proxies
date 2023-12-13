import { Inject, Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { PointsBlockchainTokenOutputPort } from '@/src/modules/Blockchain/Points/Port/Output/PointsBlockchainTokenOutputPort';
import { AddPointsRequestDto } from '../../Domain/Dto/HTTPRequest/AddPointsRequestDto';
import { DependencyInjectionBlockchainConnector } from '@helper/AppConstants';
import { PointsManagerConnector } from '@helper/blockchain/connector';
import { BalanceOfBatchParam, BalanceOfParam } from '@helper/blockchain/types/contracts/points-core-types';

config();

@Injectable()
export class PointsBlockchainAdapter implements PointsBlockchainTokenOutputPort {
	private readonly logger = new Logger('PointsBlockchainAdapter');

	constructor(
		@Inject(DependencyInjectionBlockchainConnector.POINTS_MANAGER_CONNECTOR)
		private contractInstance: PointsManagerConnector,
	) {}

	async addPoints(registerClientBlockchainDto: AddPointsRequestDto): Promise<any> {
		try {
			const { clientId, points } = registerClientBlockchainDto;

			return await this.contractInstance.addPoints({
				clientId,
				points,
			});
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in write contract addPoints function on blockchain `);
		}
	}

	async getClientPoints(clientId: number): Promise<number> {
		try {
			return await this.contractInstance.getClientPoints(clientId);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract getClientPoints function on blockchain `);
		}
	}

	async getClientLevel(clientId: number): Promise<number> {
		try {
			return await this.contractInstance.getClientLevel(clientId);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract getClientLevel function on blockchain `);
		}
	}

	async getMultiplesNFT(params: BalanceOfBatchParam) {
		try {
			const { accounts, ids } = params;

			return await this.contractInstance.getBalanceOfBatch({
				accounts,
				ids,
			});
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract getNFTsByusers function on blockchain `);
		}
	}

	async getUniqueNFT(params: BalanceOfParam): Promise<number> {
		try {
			const { account, id } = params;

			return await this.contractInstance.getBalanceOf(account, id);
		} catch (e) {}
	}
}
