import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Inject,
	Logger,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseUrls, DependencyInjectionTokens } from 'loyahub-api/src/helper/AppConstants';

import { MetadataTokenUseCase } from '@/src/modules/Metadata/Port/Input/MetadataTokenUseCase';
import { RegisterMetadataRequestDTO } from '@/src/modules/Metadata/Domain/Dto/HTTPRequest';
import { UpdateMetadataRequestBody } from '@/src/modules/Metadata/Domain/Dto/HTTPRequest/UpdateMetadataRequestDTO';
import {
	RegisterMetadataBodySwaggerAPI,
	UpdateMetadataSwaggerBodyAPI,
} from '@/src/modules/Metadata/Domain/Dto/Swagger';
import { ApplicationError, ContractError } from '@helper/APIErrors';
import { MetadataResponse } from '../../Domain/Dto/HTTPResponse/MetadataResponse';

@Controller({
	path: BaseUrls.META_DATA,
})
@ApiTags('Metadata')
export class MetadataWebAdapter {
	private readonly logger = new Logger('MetadataWebAdapter');
	constructor(
		@Inject(DependencyInjectionTokens.METADATA_TOKEN_USE_CASE)
		private metadataService: MetadataTokenUseCase,
	) {}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      REGISTER NEW METADATA TOKEN URI JSON POST           ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiBody({ required: true, type: RegisterMetadataBodySwaggerAPI })
	@ApiOperation({
		summary: 'Register a new metadata on api',
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
	async registerMetadata(@Body() registerMetadata: RegisterMetadataRequestDTO): Promise<string> {
		try {
			this.logger.log('----------PROCESS BEGIN ----------');
			this.logger.log(`Running Metadata WebAdapter`);
			this.logger.log(`Data: ${JSON.stringify(registerMetadata)}`);

			const response = await this.metadataService.registerMetadata(registerMetadata);
			this.logger.log(`Metadata response: ${JSON.stringify(response)}`);

			this.logger.log('---------- PROCESS END ----------');
			return response;
		} catch (error) {
			this.logger.log('---------- PROCESS END WITH ERROR ----------');
			const errorMessage = error.response ? error.response.data : error.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in registerMetadata on metadataWebAdapter`);
		}
	}

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
	async getTokenID(@Param('tokenID') tokenIDParam: string): Promise<MetadataResponse> {
		try {
			this.logger.log('---------- PROCESS BEGIN ----------');
			this.logger.log('Running Metadata Web Adapter');

			const tokenID = Number(tokenIDParam);
			this.logger.log(`tokenID: ${tokenID}`);

			const response = await this.metadataService.getTokenID(tokenID);

			this.logger.log(`TokenId Response:  ${JSON.stringify(response)}`);

			return response;
		} catch (error) {
			this.logger.log('---------- PROCESS END WITH ERROR ----------');
			if (error instanceof ApplicationError || error instanceof ContractError) {
				throw new HttpException(error.message, error.code);
			}
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      UPDATE  METADATA TOKEN URI JSON            ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiBody({ required: true, type: UpdateMetadataSwaggerBodyAPI })
	@ApiOperation({
		summary: 'Update a  metadata on api',
		description: 'This route is used to update a metadata tokenID off Client on blockchain',
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
	@Patch('/update/:tokenID')
	async updateMetadata(
		@Param('tokenID') tokenID: number,
		@Body() updateDataDto: UpdateMetadataRequestBody,
	): Promise<string> {
		try {
			this.logger.log('----------PROCESS BEGIN ----------');
			this.logger.log(`Running Metadata Web adapter`);
			this.logger.log(`Data: ${JSON.stringify(updateDataDto)}`);

			const response = await this.metadataService.updateMetadata({
				tokenID,
				metadataUpdate: updateDataDto,
			});

			this.logger.log(`Metadata Updated: ${response}`);

			this.logger.log('---------- PROCESS END ----------');
			return response;
		} catch (e) {
			this.logger.error(`Error in updateMetadata: ${e.message}`);
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
		}
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      DELETE METADATA TOKEN URI           ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Delete a  metadata on api',
		description: 'This route is used to delete a metadata tokenID off Client on blockchain',
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
	@ApiParam({ name: 'tokenID', type: 'number', description: 'The unique ID of the token' })
	@Delete('/delete/:tokenID')
	async deleteMetadata(@Param('tokenID') tokenID: number): Promise<string> {
		try {
			this.logger.log('----------PROCESS BEGIN ----------');
			this.logger.log(`Running Metadata Web adapter`);
			this.logger.log(`tokenID: ${tokenID}`);

			const response = await this.metadataService.deleteMetadata(tokenID);

			this.logger.log(`Metadata Deleted: ${response}`);

			this.logger.log('---------- PROCESS END ----------');

			return response;
		} catch (e) {
			this.logger.log('---------- PROCESS END WITH ERROR ----------');
			this.logger.error(`Error in deleteMetadata: ${e.message}`);
			throw new HttpException(e.message, HttpStatus.NOT_FOUND);
		}
	}
}
