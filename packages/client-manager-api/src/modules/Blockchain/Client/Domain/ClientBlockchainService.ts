/**
 * Represents a service for registering clients in a blockchain.
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from 'client-manager-api/src/helper/AppConstants';
import { ClientBlockchainTokenUseCase } from '../Port/Input/ClientBlockchainTokenUseCase';
import { ClientBlockchainTokenOutputPort } from '../Port/Output/ClientBlockchainTokenOutputPort';
import { RegisterClientRequestDto } from './Dto/HTTPRequest/ClientBlockchainRequestDto';
import { ClientData } from '@helper/blockchain/types/contracts/client-manager-types';

@Injectable()
export class ClientBlockchainService implements ClientBlockchainTokenUseCase {
	private readonly logger = new Logger('ClientBlockchainService');

	constructor(
		@Inject(DependencyInjectionTokens.CLIENTBLOCKCHAIN_TOKEN_OUTPUT_PORT)
		private readonly clientBlockchainTokenAdapter: ClientBlockchainTokenOutputPort,
	) {}

	/**
	 * Registers a client in the blockchain.
	 * @param {RegisterClientRequestDto} RegisterClientRequestDto - The request DTO containing client information.
	 * @returns {Promise<any>} - A promise that resolves to a success message upon successful registration.
	 * @throws {Error} - If an error occurs while creating the client.
	 */
	async registerClient(RegisterClientRequestDto: RegisterClientRequestDto): Promise<any> {
		try {
			await this.clientBlockchainTokenAdapter.registerClient(RegisterClientRequestDto);
			return 'Cliente registrado com sucesso!';
		} catch (e) {
			this.logger.error(`Error in Client Blockchain Service: ${JSON.stringify(e)}`);
			throw new Error('An error ocurred while creating the client');
		}
	}

	async getClientData(clientId: number): Promise<ClientData> {
		try {
			return await this.clientBlockchainTokenAdapter.getClientData(clientId);
		} catch (e) {
			this.logger.error(`Error in Client Blockchain Service: ${JSON.stringify(e)}`);
			throw new Error('An error ocurred while get the client');
		}
	}
}
