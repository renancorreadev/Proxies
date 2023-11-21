import { Wallet } from 'ethers';
import { Body, Controller, Get, Inject, Logger, Param, Post, Query } from '@nestjs/common';
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
import { ClientBlockchainTokenUseCase } from '../../Port/Input/ClientBlockchainTokenUseCase';
import { RegisterClientRequestDto } from '../../Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';
import { GetClientResponse } from '../../Domain/Dto/HTTPResponse/GetClientResponse';

@Controller({
	path: BaseUrls.CLIENT_BLOCKCHAIN,
})
@ApiTags('Blockchain Client')
export class ClientWebAdapter {
	private readonly logger = new Logger('ClientWebAdapter');
	constructor(
		@Inject(DependencyInjectionTokens.CLIENT_BLOCKCHAIN_TOKEN_USE_CASE)
		private clientBlockchainService: ClientBlockchainTokenUseCase,
	) {}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      REGISTER NEW CLIENT POST           ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiBody({ required: true, type: RegisterClientRequestDto })
	@ApiOperation({
		summary: 'Register a new Client on blockchain',
		description: 'This route is used to register a new Client on blockchain',
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
	@Post('/new')
	async registerNewClient(@Body() clientBlockchainRequestDTO: RegisterClientRequestDto): Promise<string> {
		this.logger.log('----------PROCESS BEGIN ----------');
		this.logger.log(`Running Client Blockchain Web adapter`);
		this.logger.log(`Data: ${JSON.stringify(clientBlockchainRequestDTO)}`);

		const response = await this.clientBlockchainService.registerClient(clientBlockchainRequestDTO);

		this.logger.log('---------- PROCESS END ----------');
		return response;
	}
	/// --------------------------------------------------------------------------------------
	/// ------------------------      GET CLIENT DATA POST          ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Get Client Data by ID',
		description: 'Find Client Information by ID',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: GetClientResponse,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@Get('/:id')
	async getClientData(@Param('id') id: number) {
		return await this.clientBlockchainService.getClientData(+id);
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      GET CLIENT DATA BY NAME          ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Get Client Data by Name',
		description: 'Find Client Information by name provider',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: GetClientResponse,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@Get('dataBy/:name')
	async getClientByName(@Param('name') name: string) {
		try {
			this.logger.log('---------- PROCESS BEGIN ----------');
			this.logger.log('Running PointBlockchain web adapter');
			this.logger.log(`name: ${name}`);

			return await this.clientBlockchainService.getClientByName(name);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract getClientByName on blockchain `);
		}
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      GET CLIENT DATA BY AGE          ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Get Clients Data by Age',
		description: 'Find Clients Information by age',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: GetClientResponse,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@Get('/dataBy/:age')
	async getClientByAge(@Param('age') age: number) {
		try {
			this.logger.log('---------- PROCESS BEGIN ----------');
			this.logger.log('Running PointBlockchain web adapter');
			this.logger.log(`age: ${age}`);

			return await this.clientBlockchainService.getClientByAge(age);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract getClientByAge on blockchain `);
		}
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      GET CLIENT DATA BY WALLET          ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Get Client Data by Wallet',
		description: 'Find Client Information by Wallet',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: GetClientResponse,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@Get('/dataBy/:wallet')
	async getClientByWallet(@Param('wallet') wallet: string) {
		try {
			this.logger.log('---------- PROCESS BEGIN ----------');
			this.logger.log('Running PointBlockchain web adapter');
			this.logger.log(`wallet: ${wallet}`);

			return await this.clientBlockchainService.getClientByWallet(wallet);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error occurred in read contract getClientByWallet on blockchain`);
		}
	}
}
