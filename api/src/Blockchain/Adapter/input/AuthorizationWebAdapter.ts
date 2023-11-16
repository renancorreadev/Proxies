import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
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
import { AuthorizationTokenUseCase } from '../../Port/Input/AuthorizationTokenUseCase';
import { AuthorizationRequestDto } from '../../Domain/Dto/RequestsDtos/AuthorizationRequestDto';

@Controller({
	path: BaseUrls.AUTHORIZATION,
})
@ApiTags('Authorization')
export class AuthorizationWebAdapter {
	private readonly logger = new Logger('AuthorizationWebAdapter');
	constructor(
		@Inject(DependencyInjectionTokens.AUTHORIZATION_TOKEN_USE_CASE)
		private authorizationService: AuthorizationTokenUseCase,
	) {}

	@ApiBody({ required: true, type: AuthorizationRequestDto })
	@ApiOperation({
		summary: 'Mint a new Authorization',
		description: 'Mint a new Authorization',
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
	@Post('/')
	async createNewAuthorization(@Body() authorizationRequestDto: AuthorizationRequestDto): Promise<string> {
		this.logger.log('----------PROCESS BEGIN ----------');
		this.logger.log(`Running Authorization web adapter`);
		this.logger.log(`Data: ${JSON.stringify(authorizationRequestDto)}`);

		const response = await this.authorizationService.createAuthorizationToken(authorizationRequestDto);

		this.logger.log('---------- PROCESS END ----------');
		return response;
	}
}
