// src/modules/Authentication/Adapters/Input/AuthenticationWebAdapter.ts
import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseUrls, DependencyInjectionTokens } from 'customer-rewards-api/src/helper/AppConstants';
import { AuthenticationService } from '../../Domain/AuthenticationService';
import { LoginDTO } from '../../Domain/DTO/HTTPRequest/AuthenticationRequest';

import { LoginDTOSwagger } from '../../Domain/DTO/Swagger/LoginDtoSwagger';
import { RegisterDtoSwagger } from '../../Domain/DTO/Swagger/RegisterDtoSwagger';

@Controller(BaseUrls.AUTH)
@ApiTags('Authentication Endpoints')
export class AuthenticationWebAdapter {
	private readonly logger = new Logger('MetadataWebAdapter');

	constructor(
		@Inject(DependencyInjectionTokens.AUTH_TOKEN_USE_CASE)
		private authenticationService: AuthenticationService,
	) {}

	@Post('/login')
	@ApiOperation({ summary: 'Login user', description: 'Login user to application' })
	@ApiBody({ type: LoginDTOSwagger })
	@ApiOkResponse({ description: 'Login successful', type: String })
	@ApiUnauthorizedResponse({ description: 'Invalid credentials' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async login(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }> {
		try {
			this.logger.log('---------- PROCESS BEGIN ----------');
			this.logger.log('Running Authentication Web Adapter');

			this.logger.log(`loginDTO: ${loginDTO}`);
			return await this.authenticationService.login(loginDTO);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in executing login method on application `);
		}
	}

	@Post('/register')
	@ApiOperation({ summary: 'Register user', description: 'Register new user to application' })
	@ApiBody({ type: RegisterDtoSwagger })
	@ApiOkResponse({ description: 'Registration successful', type: String })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async register(@Body() registerDTO: { email: string; password: string }): Promise<any> {
		console.log(registerDTO);
		try {
			if (registerDTO) {
				this.logger.log('---------- PROCESS BEGIN ----------');
				this.logger.log('Running Authentication Web Adapter');
				this.logger.log('Executing register method...');

				this.logger.log(`loginDTO: ${registerDTO}`);
				return this.authenticationService.register(registerDTO.email, registerDTO.password);
			} else {
				throw new Error('Bad request');
			}
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in executing register method on application `);
		}
	}
}
