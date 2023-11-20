import { Body, Controller, Get, Inject, Logger, Param, Post } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseUrls, DependencyInjectionTokens } from 'client-manager-api/src/helper/AppConstants';

import { PointsBlockchainTokenUseCase } from '../../Port/Input/PointsBlockchainTokenUseCase';
import { AddPointsRequestDto } from '../../Domain/Dto/HTTPRequest/AddPointsRequestDto';

@Controller({
	path: BaseUrls.POINTS_BLOCKCHAIN,
})
@ApiTags('Blockchain Points')
export class PointsBlockchainWebAdapter {
	private readonly logger = new Logger('PointsBlockchainWebAdapter');
	constructor(
		@Inject(DependencyInjectionTokens.POINTS_BLOCKCHAIN_TOKEN_USE_CASE)
		private pointsBlockchainService: PointsBlockchainTokenUseCase,
	) {}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      REGISTER NEW CLIENT POST           ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiBody({ required: true, type: AddPointsRequestDto })
	@ApiOperation({
		summary: 'Add points to client on blockchain',
		description:
			'Esse endpoint adiciona pontos para um determinado cliente pelo id na blockchain, o cliente receberá NFTs com base em sua pontuação, para 200 pontos ele ira receber um NFT com a insignia Premium, 500 pontos irá receber um NFT com a insignia Gold, 1000 pontos acumulados o mesmo ira receber a insignia Titanium.',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: String,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@ApiInternalServerErrorResponse({ description: 'Unexpected error' })
	@Post('/add')
	async addPoints(@Body() clientBlockchainRequestDTO: AddPointsRequestDto): Promise<string> {
		this.logger.log('----------PROCESS BEGIN ----------');
		this.logger.log(`Running Client Blockchain Web adapter`);
		this.logger.log(`Data: ${JSON.stringify(clientBlockchainRequestDTO)}`);

		const response = await this.pointsBlockchainService.addPoints(clientBlockchainRequestDTO);

		this.logger.log('---------- PROCESS END ----------');
		return response;
	}
}
