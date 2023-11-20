import { Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { PointsBlockchainTokenOutputPort } from 'client-manager-api/src/modules/Blockchain/Points/Port/Output/PointsBlockchainTokenOutputPort';
import { AddPointsRequestDto } from '../../Domain/Dto/HTTPRequest/AddPointsRequestDto';

// DTO

config();

@Injectable()
export class PointsBlockchainAdapter implements PointsBlockchainTokenOutputPort {
	private readonly logger = new Logger('PointsBlockchainAdapter');
	// private contractInstance: ClientBlockchainConnectorAdapter;

	constructor() {
		// this.contractInstance = new ClientBlockchainConnectorAdapter(
		// 	process.env.CONTRACT_ADDRESS,
		// 	process.env.PROVIDER,
		// 	process.env.PRIVATE_KEY,
		// );
	}

	async addPoints(registerClientBlockchainDto: AddPointsRequestDto): Promise<any> {
		try {
			const { clientID, points } = registerClientBlockchainDto;
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in write contract registerClient function on blockchain `);
		}
	}
}
