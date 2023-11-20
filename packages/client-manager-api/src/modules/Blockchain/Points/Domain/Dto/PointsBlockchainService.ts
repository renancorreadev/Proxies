import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from 'client-manager-api/src/helper/AppConstants';
import { PointsBlockchainTokenUseCase } from '../../Port/Input/PointsBlockchainTokenUseCase';
import { PointsBlockchainTokenOutputPort } from '../../Port/Output/PointsBlockchainTokenOutputPort';
import { AddPointsRequestDto } from '../Dto/HTTPRequest/AddPointsRequestDto';

@Injectable()
export class PointsBlockchainService implements PointsBlockchainTokenUseCase {
	private readonly logger = new Logger('ClientBlockchainService');

	constructor(
		@Inject(DependencyInjectionTokens.POINTS_BLOCKCHAIN_TOKEN_OUTPUT_PORT)
		private readonly clientBlockchainTokenAdapter: PointsBlockchainTokenOutputPort,
	) {}

	async addPoints(addPointsRequestDTO: AddPointsRequestDto): Promise<any> {
		try {
			await this.clientBlockchainTokenAdapter.addPoints(addPointsRequestDTO);
			return 'Foi adicionado os pontos ao cliente com sucesso!';
		} catch (e) {
			this.logger.error(`Error in Points Blockchain Service: ${JSON.stringify(e)}`);
			throw new Error('An error ocurred while adding the points');
		}
	}

	// async getClientData(clientId: number): Promise<ClientData> {
	// 	try {
	// 		return await this.clientBlockchainTokenAdapter.getClientData(clientId);
	// 	} catch (e) {
	// 		this.logger.error(`Error in Client Blockchain Service: ${JSON.stringify(e)}`);
	// 		throw new Error('An error ocurred while get the client');
	// 	}
	// }
}
