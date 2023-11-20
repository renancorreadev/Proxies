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
import { GetClientPointsResponse } from '../../Domain/Dto/HTTPResponse/GetClientPointsResponse';
import { GetClientLevelResponse } from '../../Domain/Dto/HTTPResponse/GetClientLevelResponse';

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

	@ApiOperation({
		summary: 'Add points to client on blockchain',
		description:
			'Esse endpoint adiciona pontos para um determinado cliente pelo id na blockchain, o cliente receberá NFTs com base em sua pontuação, para 200 pontos ele ira receber um NFT com a insignia Premium, 500 pontos irá receber um NFT com a insignia Gold, 1000 pontos acumulados o mesmo ira receber a insignia Titanium.',
	})
	@ApiBody({ required: true, type: AddPointsRequestDto })
	@ApiOkResponse({
		description: 'Success operation',
		type: String,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@ApiInternalServerErrorResponse({ description: 'Unexpected error' })
	@Post('add')
	async addPoints(@Body() clientBlockchainRequestDTO: AddPointsRequestDto): Promise<string> {
		this.logger.log('----------PROCESS BEGIN ----------');
		this.logger.log(`Running Client Blockchain Web adapter`);
		this.logger.log(`Data: ${JSON.stringify(clientBlockchainRequestDTO)}`);

		const response = await this.pointsBlockchainService.addPoints(clientBlockchainRequestDTO);

		this.logger.log('---------- PROCESS END ----------');
		return response;
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      GET CLIENT POINTS           ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Get Client Points by ID',
		description: 'Find Client Points Information by ID',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: GetClientPointsResponse,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@Get('/:id')
	async getClientPoints(@Param('id') id: number) {
		return await this.pointsBlockchainService.getClientPoints(+id);
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      GET CLIENT LEVEL           ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Get Client Level by ID',
		description:
			'Retorna o nível que o cliente se encontra no momento diretamente da blockchain. Valor 1 = Premium, Valor 2 = Gold, Valor 3 = Titanium',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: GetClientLevelResponse,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@Get('/level/:id')
	async getClientLevel(@Param('id') id: number) {
		return await this.pointsBlockchainService.getClientLevel(+id);
	}
}
