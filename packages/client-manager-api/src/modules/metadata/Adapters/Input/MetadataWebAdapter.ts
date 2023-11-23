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
import { MetadataTokenUseCase } from '../../Port/Input/MetadataTokenUseCase';

@Controller({
	path: BaseUrls.META_DATA,
})
@ApiTags('Metadata')
export class MetadataWebAdapter {
	private readonly logger = new Logger('ClientWebAdapter');
	constructor(
		@Inject(DependencyInjectionTokens.CLIENT_BLOCKCHAIN_TOKEN_USE_CASE)
		private metadataService: MetadataTokenUseCase,
	) {}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      REGISTER NEW METADATA TOKEN URI JSON POST           ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiBody({ required: true, type: String })
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
	// async registerNewClient(@Body() clientBlockchainRequestDTO: RegisterClientRequestDto): Promise<string> {
	// 	this.logger.log('----------PROCESS BEGIN ----------');
	// 	this.logger.log(`Running Client Blockchain Web adapter`);
	// 	this.logger.log(`Data: ${JSON.stringify(clientBlockchainRequestDTO)}`);

	// 	const response = await this.metadataService.registerClient(clientBlockchainRequestDTO);

	// 	this.logger.log('---------- PROCESS END ----------');
	// 	return response;
	// }

	/// --------------------------------------------------------------------------------------
	/// ------------------------      GET METADATA  TOKEN URI JSON           ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Get Metadata by Token URI JSON on blockchain',
		description: 'Find Client Information by name provider',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: String,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@Get('/:tokenID')
	async getClientByName(@Param('tokenID') tokenID: string) {
		try {
			this.logger.log('---------- PROCESS BEGIN ----------');
			this.logger.log('Running PointBlockchain web adapter');
			this.logger.log(`tokenID: ${tokenID}`);

			// return await this.metadataService.getClientByName(name);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract getClientByName on blockchain `);
		}
	}
}
