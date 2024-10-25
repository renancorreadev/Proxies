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
import { BaseUrls, DependencyInjectionTokens } from 'loyahub-api/src/helper/AppConstants';

import { UserService } from '../../Domain/UserService';

import { UserRegisterResponse } from '../../Domain/DTO/HTTPResponse/userHttpResponse';
import { UserRegisterDTORequest } from '../../Domain/DTO/HTTPRequest/userHttpRequest';
import { GetUserResponseSwagger, UserUpdateSwagger } from '../../Domain/DTO/Swagger';

import { UserInfo } from '../../Domain/@types/user';

@Controller(BaseUrls.USER)
@ApiTags('User API Endpoints')
export class UserWebAdapter {
	private readonly logger = new Logger('UserWebAdapter');

	constructor(
		@Inject(DependencyInjectionTokens.USER_TOKEN_USE_CASE)
		private userService: UserService,
	) {}

	/**
	 *
	 * @param registerDTO
	 * @returns `{ message: string }`
	 */
	@Post('/register')
	@ApiOperation({ summary: 'Register user', description: 'Register new user to application' })
	@ApiBody({ type: UserRegisterDTORequest })
	@ApiOkResponse({ description: 'Registration successful', type: UserRegisterResponse })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async register(@Body() registerDTO: UserRegisterDTORequest): Promise<any> {
		try {
			if (registerDTO) {
				this.logger.log('---------- PROCESS BEGIN ----------');
				this.logger.log('Running User Web Adapter');
				this.logger.log('Executing register method...');

				this.logger.log(`email: ${registerDTO.email}`);
				this.logger.log(`username: ${registerDTO.username}`);
				this.logger.log(`password: ${registerDTO.password}`);
				registerDTO.isAdmin ? this.logger.log(`isAdmin: ${registerDTO.isAdmin}`) : this.logger.log(`isAdmin: false`);
				this.logger.log('---------- PROCESS END ----------');

				return this.userService.register({
					email: registerDTO.email,
					username: registerDTO.username,
					password: registerDTO.password,
					profileImageUrl: registerDTO.profileImageUrl,
					isAdmin: registerDTO.isAdmin,
				});
			} else {
				throw new Error('Bad request');
			}
		} catch (e) {
			this.logger.error(`Error : ${JSON.stringify(e.message)}`);
			throw new HttpException({ message: e.message, error: 'Bad Request' }, e.statusCode || HttpStatus.BAD_REQUEST);
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
			this.logger.log(`Running User Web adapter`);
			this.logger.log(`email: ${email}`);

			this.logger.log('---------- PROCESS END ----------');

			const result = await this.userService.deleteUser(email);
			if (result) {
				return 'User deleted successfully';
			}

			return result;
		} catch (e) {
			this.logger.error(`Error in getClientData: ${e.message}`);
			throw new HttpException(e.message, e.statusCode || HttpStatus.NOT_FOUND);
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
		type: GetUserResponseSwagger,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@Get('/get/:email')
	async getClientData(@Param('email') email: string) {
		return await this.userService.getUser(email);
	}

	/// --------------------------------------------------------------------------------------
	/// ------------------------      UPDATE  METADATA TOKEN URI JSON            ---------------------
	/// --------------------------------------------------------------------------------------
	@ApiBody({ required: true, type: UserUpdateSwagger })
	@ApiOperation({
		summary: 'Update a  user on api',
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
	@Patch('/update/:email')
	async updateUser(@Param('email') email: string, @Body() updateUserDTO: UserInfo): Promise<UserInfo> {
		try {
			this.logger.log('----------PROCESS BEGIN ----------');
			this.logger.log(`Running Metadata Web adapter`);
			this.logger.log(`email: ${email}`);
			this.logger.log(`updateUserDTO: ${JSON.stringify(updateUserDTO)}`);
			this.logger.log('---------- PROCESS END ----------');
			return await this.userService.updateUser(email, updateUserDTO);
		} catch (e) {
			this.logger.error(`Error in updateUser: ${e.message}`);
			throw new HttpException(e.message, e.statusCode || HttpStatus.BAD_REQUEST);
		}
	}
}
