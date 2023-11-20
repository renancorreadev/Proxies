import { Inject, Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { PointsBlockchainTokenOutputPort } from '@/src/modules/blockchain/Points/Port/Output/PointsBlockchainTokenOutputPort';
import { AddPointsRequestDto } from '../../Domain/Dto/HTTPRequest/AddPointsRequestDto';
import { DependencyInjectionBlockchainConnector } from '@helper/AppConstants';
import { PointsManagerConnector } from '@helper/blockchain/connector';

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
}
