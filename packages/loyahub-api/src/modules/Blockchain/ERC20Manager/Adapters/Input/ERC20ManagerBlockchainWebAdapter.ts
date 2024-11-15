import { Query, Controller, Get, HttpException, Inject, Logger, Post, Body } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { BaseUrls, DependencyInjectionTokens } from 'loyahub-api/src/helper/AppConstants';
import { ERC20ManagerBlockchainTokenUseCase } from '../../Port/Input/ERC20ManagerBlockchainTokenUseCase';
import { ApproveDrexRequestDTO } from '../../Domain/Dto/HTTPRequest/approve-request-dto';

@Controller({
	path: BaseUrls.ERC20_BLOCKCHAIN,
})
@ApiTags('Blockchain ERC20 Manager Endpoints')
export class ERC20ManagerBlockchainWebAdapter {
	private readonly logger = new Logger('ERC20ManagerBlockchainWebAdapter');
	constructor(
		@Inject(DependencyInjectionTokens.ERC20_MANAGER_BLOCKCHAIN_TOKEN_OUTPUT_PORT)
		private erc20BlockchainService: ERC20ManagerBlockchainTokenUseCase,
	) {}

	@ApiOperation({
		summary: 'Get Balance of Drex on ERC20',
		description: 'Esse Endpoint retorna o saldo DREX',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: String,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@ApiInternalServerErrorResponse({ description: 'Unexpected error' })
	@Get('balanceDrex')
	async getBalanceDrex(@Query('email') email: string): Promise<number> {
		try {
			this.logger.log('----------PROCESS BEGIN ----------');
			this.logger.log(`Running ERC20 Blockchain Web adapter`);
			this.logger.log(`Execution: balanceOf with params: email=${email}`);

			const response = await this.erc20BlockchainService.getBalanceDrex({ email });

			this.logger.log(`Balance retrieved: ${response}`);
			this.logger.log('---------- PROCESS END ----------');
			return response;
		} catch (error) {
			this.logger.log('---------- PROCESS END WITH ERROR ----------');
			this.logger.error(`Error in ERC20 Blockchain Service: ${JSON.stringify(error)}`);
			throw new HttpException('An error occurred while getting the Drex balance', 500);
		}
	}

	@ApiOperation({
		summary: 'Approve Drex',
		description: 'Esse Endpoint aprova o gasto do token DREX',
	})
	@ApiOkResponse({
		description: 'Success operation',
		type: String,
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiForbiddenResponse({ description: 'Forbidden' })
	@ApiNotFoundResponse({ description: 'Segment not found' })
	@ApiInternalServerErrorResponse({ description: 'Unexpected error' })
	@Post('approveDrex')
	async approveDrex(@Body() params: ApproveDrexRequestDTO): Promise<string> {
		try {
			const { amount, spender } = params;
			this.logger.log('----------PROCESS BEGIN ----------');
			this.logger.log(`Running ERC20 Blockchain Web adapter`);
			this.logger.log(`Execution: approveDrex with params: amount=${amount} and spender=${spender}`);

			const response = await this.erc20BlockchainService.approveDrex(params);

			if (!response) {
				throw new HttpException('An error occurred while approving the Drex', 500);
			} else {
				this.logger.log('Approval successful');
			}
			this.logger.log('---------- PROCESS END ----------');
			return 'Approval successful';
		} catch (error) {
			this.logger.log('---------- PROCESS END WITH ERROR ----------');
			this.logger.error(`Error in ERC20 Blockchain Service: ${JSON.stringify(error)}`);
			throw new HttpException('An error occurred while approving the Drex', 500);
		}
	}
}
