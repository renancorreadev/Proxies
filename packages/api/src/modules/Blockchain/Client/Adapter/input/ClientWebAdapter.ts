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
import { BaseUrls, DependencyInjectionTokens } from '@src/helper/AppConstants';
import { ClientBlockchainTokenUseCase } from '../../Port/Input/ClientBlockchainTokenUseCase';
import { GetClientDataResponse, RegisterClientRequestDto } from '../../Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';

@Controller({
	path: BaseUrls.CLIENT_BLOCKCHAIN,
})

@ApiTags('Blockchain')
export class ClientWebAdapter {
	private readonly logger = new Logger('ClientWebAdapter');
	constructor(
		@Inject(DependencyInjectionTokens.CLIENT_BLOCKCHAIN_TOKEN_USE_CASE)
		private clientBlockchainService: ClientBlockchainTokenUseCase,
	) { }

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
		type: GetClientDataResponse,
	})

	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@Get('/:id')
	async findOne(@Param('id') id: number) {
		return await this.clientBlockchainService.getClientData(+id);
	}
}
