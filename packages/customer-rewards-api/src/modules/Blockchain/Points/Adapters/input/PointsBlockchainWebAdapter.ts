import {
	BadRequestException,
	Body,
	Controller,
	Patch,
	Get,
	HttpException,
	Inject,
	Logger,
	Param,
	Post,
	Query,
	// UseGuards,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	// ApiBearerAuth,
	ApiBody,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	// @ApiUnauthorizedResponse({ description: 'Unauthorized' }),
} from '@nestjs/swagger';
import { BaseUrls, DependencyInjectionTokens } from 'customer-rewards-api/src/helper/AppConstants';

import { PointsBlockchainTokenUseCase } from '../../Port/Input/PointsBlockchainTokenUseCase';

import { AddPointsRequestDto, RemovePointsRequestDTO } from '../../Domain/Dto/HTTPRequest/AddPointsRequestDto';
import { GetClientPointsResponse } from '../../Domain/Dto/HTTPResponse/GetClientPointsResponse';
import { GetClientLevelResponse } from '../../Domain/Dto/HTTPResponse/GetClientLevelResponse';

import { GetUniqueNFTResponse } from '../../Domain/Dto/HTTPResponse/GetUniqueNFTResponse';
import { JwtAuthGuard } from '@/src/modules/Authentication/Guards/Auth.Guard';

// @ApiBearerAuth('JWT-auth')
@Controller({
	path: BaseUrls.POINTS_BLOCKCHAIN,
})
@ApiTags('Blockchain Points Management Endpoints')
export class PointsBlockchainWebAdapter {
	private readonly logger = new Logger('PointsBlockchainWebAdapter');
	constructor(
		@Inject(DependencyInjectionTokens.POINTS_BLOCKCHAIN_TOKEN_USE_CASE)
		private pointsBlockchainService: PointsBlockchainTokenUseCase,
	) {}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      ADD POINTS TO CUSTOMER          ---------------------
	/// --------------------------------------------------------------------------------------
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
	// @	// @ApiUnauthorizedResponse({ description: 'Unauthorized' })({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@ApiInternalServerErrorResponse({ description: 'Unexpected error' })
	// @UseGuards(JwtAuthGuard)
	@Post('add')
	async addPoints(@Body() clientBlockchainRequestDTO: AddPointsRequestDto): Promise<string> {
		try {
			this.logger.log('----------PROCESS BEGIN ----------');
			this.logger.log(`Running Client Blockchain Web adapter`);
			this.logger.log(`Execution: addPoints with params: ${JSON.stringify(clientBlockchainRequestDTO)}`);

			const response = await this.pointsBlockchainService.addPoints(clientBlockchainRequestDTO);

			this.logger.log('---------- PROCESS END ----------');
			return response;
		} catch (error) {
			this.logger.error(`Error in Points Blockchain Service: ${JSON.stringify(error)}`);
			throw new HttpException('An error ocurred while adding the points', 500);
		}
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      REMOVE POINTS TO CUSTOMER          ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Remove points to client on blockchain',
		description: 'Esse endpoint remove pontos para um determinado cliente pelo id na blockchain.',
	})
	@ApiBody({ required: true, type: AddPointsRequestDto })
	@ApiOkResponse({
		description: 'Success operation',
		type: String,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	// @	// @ApiUnauthorizedResponse({ description: 'Unauthorized' })({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@ApiInternalServerErrorResponse({ description: 'Unexpected error' })
	// @UseGuards(JwtAuthGuard)
	@Patch('/remove')
	async removePoints(@Body() removePointsDTO: RemovePointsRequestDTO): Promise<string> {
		try {
			this.logger.log('----------PROCESS BEGIN ----------');
			this.logger.log(`Running Client Blockchain Web adapter`);
			this.logger.log(`Execution: removePoints with params: ${JSON.stringify(removePointsDTO)}`);

			const response = await this.pointsBlockchainService.removePoints(removePointsDTO);

			this.logger.log('---------- PROCESS END ----------');
			return response;
		} catch (error) {
			this.logger.error(`Error in Points Blockchain Service: ${JSON.stringify(error)}`);
			throw new HttpException('An error ocurred while adding the points', 500);
		}
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
	// @ApiUnauthorizedResponse({ description: 'Unauthorized' })({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	// @UseGuards(JwtAuthGuard)
	@Get('/:id')
	async getClientPoints(@Param('id') id: number) {
		try {
			this.logger.log('---------- PROCESS BEGIN ----------');
			this.logger.log('Running PointBlockchain web adapter');
			this.logger.log(`Execution: getClientPoints with params: id: ${id}`);

			return await this.pointsBlockchainService.getClientPoints(+id);
		} catch (error) {
			this.logger.error(`Error in Points Blockchain Service: ${JSON.stringify(error)}`);
			throw new HttpException('An error ocurred while get the client points', 500);
		}
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
	// @ApiUnauthorizedResponse({ description: 'Unauthorized' })({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	// @UseGuards(JwtAuthGuard)
	@Get('/level/:id')
	async getClientLevel(@Param('id') id: number) {
		try {
			this.logger.log('---------- PROCESS BEGIN ----------');
			this.logger.log('Running PointBlockchain web adapter');
			this.logger.log(`Execution: getClientLevel with params: id: ${id}`);

			return await this.pointsBlockchainService.getClientLevel(+id);
		} catch (error) {
			this.logger.error(`Error in Client Blockchain Service: ${JSON.stringify(error)}`);
			throw new Error('An error ocurred while get the getClientLevel');
		}
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------ GET MULTIPLES NFTS ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Get Multiples NFT By Customer Wallets and NFT Ids',
		description:
			'Esse Endpoint retorna quantos Tokens um usuário recebeu, ou ele mostra qual NFT ele possui até o momento de sua execução.',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: GetUniqueNFTResponse,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	// @ApiUnauthorizedResponse({ description: 'Unauthorized' })({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	// @UseGuards(JwtAuthGuard)
	@Get('/nfts/all')
	async getMultiplesNFT(@Query('accounts') accounts: string[], @Query('NFTIDs') ids: number[]): Promise<number[]> {
		this.logger.log('---------- PROCESS BEGIN ----------');
		this.logger.log('Running PointBlockchain web adapter');
		this.logger.log(`Execution: getMultiplesNFT with params: accounts: ${accounts} | NFTIds: ${ids}`);

		if (accounts.length < 2 || ids.length < 2) {
			throw new BadRequestException('Os parâmetros accounts e ids devem conter pelo menos dois itens.');
		}

		try {
			return await this.pointsBlockchainService.getMultiplesNFT({ accounts, ids });
		} catch (error) {
			if (error) {
				throw new HttpException(error.message, error.code);
			}
			throw new HttpException(error.message, 500);
		}
		this.logger.log('---------- PROCESS END ----------');
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------ GET UNIQUE NFT ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Get Unique NFT By Customer Wallet and NFT ID',
		description:
			'Esse Endpoint retorna quantidade de NFT um usuário recebeu. Para NFT ID 1 = NFT Premium, NFT ID 2 = NFT Gold, NFT ID 3 = NFT Titanium',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: GetUniqueNFTResponse,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	// @ApiUnauthorizedResponse({ description: 'Unauthorized' })({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	// @UseGuards(JwtAuthGuard)
	@Get('/nfts/simple')
	async getUniqueNFT(@Query('accounts') accounts: string, @Query('NFTID') id: number): Promise<number> {
		this.logger.log('---------- PROCESS BEGIN ----------');
		this.logger.log('Running PointBlockchain web adapter');
		this.logger.log(`Execution: getUniqueNFT with params: accounts: ${accounts} | NFTID: ${id}`);

		try {
			return await this.pointsBlockchainService.getUniqueNFT({
				account: accounts,
				id,
			});
		} catch (error) {
			if (error) {
				throw new HttpException(error.message, error.code);
			}
			throw new HttpException(error.message, 500);
		}
		this.logger.log('---------- PROCESS END ----------');
	}
}
