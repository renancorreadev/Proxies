// src/modules/Authentication/Adapters/Input/AuthenticationWebAdapter.ts
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Logger, Param, Post } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiBody,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseUrls, DependencyInjectionTokens } from 'customer-rewards-api/src/helper/AppConstants';
import { AuthenticationService } from '../../Domain/AuthenticationService';
import { RegisterDtoSwagger } from '../../Domain/DTO/Swagger/RegisterDtoSwagger';
import { GetUserResponse } from '../../Port/Output/Response';

@Controller(BaseUrls.USER)
@ApiTags('User API Endpoints')
export class UserWebAdapter {
	private readonly logger = new Logger('UserWebAdapter');

	constructor(
		@Inject(DependencyInjectionTokens.AUTH_TOKEN_USE_CASE)
		private authenticationService: AuthenticationService,
	) {}

	/**
	 *
	 * @param registerDTO
	 * @returns `{ message: string }`
	 */
	@Post('/register')
	@ApiOperation({ summary: 'Register user', description: 'Register new user to application' })
	@ApiBody({ type: RegisterDtoSwagger })
	@ApiOkResponse({ description: 'Registration successful', type: String })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async register(@Body() registerDTO: { email: string; password: string; isAdmin?: boolean }): Promise<any> {
		try {
			if (registerDTO) {
				this.logger.log('---------- PROCESS BEGIN ----------');
				this.logger.log('Running Authentication Web Adapter');
				this.logger.log('Executing register method...');

				this.logger.log(`email: ${registerDTO.email}`);
				this.logger.log(`password: ${registerDTO.password}`);
				registerDTO.isAdmin ? this.logger.log(`isAdmin: ${registerDTO.isAdmin}`) : this.logger.log(`isAdmin: false`);
				this.logger.log('---------- PROCESS END ----------');

				return this.authenticationService.register(registerDTO.email, registerDTO.password, registerDTO.isAdmin);
			} else {
				throw new Error('Bad request');
			}
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in executing register method on application `);
		}
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      DELETE USER           ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Delete a  user on api',
		description: 'This route is used to delete a user.',
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
	@ApiParam({ name: 'email', type: 'string', description: 'The email registered' })
	@Delete('/delete')
	async deleteUser(@Param('email') email: string): Promise<string> {
		try {
			this.logger.log('----------PROCESS BEGIN ----------');
			this.logger.log(`Running Authentication Web adapter`);
			this.logger.log(`email: ${email}`);

			this.logger.log('---------- PROCESS END ----------');

			const result = await this.authenticationService.deleteUser(email);
			if (result) {
				return 'User deleted successfully';
			}

			return result;
		} catch (e) {
			this.logger.error(`Error in deleteMetadata: ${e.message}`);
			throw new HttpException(e.message, HttpStatus.NOT_FOUND);
		}
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      GET USER DATA          ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiOperation({
		summary: 'Get User by Email',
		description: 'Find User Information by Email',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: GetUserResponse,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@Get('/get/:email')
	async getClientData(@Param('email') email: string) {
		return await this.authenticationService.getUser(email);
	}
}
