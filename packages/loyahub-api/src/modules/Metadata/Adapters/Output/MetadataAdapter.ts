import { Inject, Injectable, Logger } from '@nestjs/common';
import { DependencyInjectionTokens } from '@src/helper/AppConstants';

import { MetadataStorageOutputPort, MetadataTokenOutputPort } from '@/src/modules/Metadata/Port/Output';
import { MetadataResponse } from '@/src/modules/Metadata/Domain/Dto/HTTPResponse/MetadataResponse';
import { RegisterMetadataRequestDTO, UpdateMetadataRequestDTO } from '@/src/modules/Metadata/Domain/Dto/HTTPRequest';

@Injectable()
export class MetadataAdapter implements MetadataTokenOutputPort {
	private readonly logger = new Logger(MetadataAdapter.name);

	constructor(
		@Inject(DependencyInjectionTokens.METADATA_STORAGE_OUTPUT_PORT)
		private readonly metadataStorage: MetadataStorageOutputPort,
	) {}

	/**
	 * Registers metadata using the provided DTO.
	 *
	 * @param {RegisterMetadataRequestDTO} registerMetadata - The DTO containing the metadata to be registered.
	 * @returns {Promise<string>} A promise that resolves to a success message when the metadata is registered.
	 * @throws {Error} If an error occurs while trying to register the metadata.
	 */
	async registerMetadata(registerMetadata: RegisterMetadataRequestDTO): Promise<string> {
		try {
			await this.metadataStorage.saveMetadata(registerMetadata);
			return 'Metadata succesfully registered';
		} catch (error) {
			this.logger.error(`Error while trying to registerMetadata: ${error}`);
			throw new Error(`Error while trying to registerMetadata: ${error}`);
		}
	}

	/**
	 * Retrieves the metadata for a given token ID.
	 *
	 * @param {number} tokenID - The ID of the token for which to retrieve the metadata.
	 * @returns {Promise<MetadataResponse>} - A promise that resolves to the metadata response.
	 * @throws {Error} - If there is an error while retrieving the metadata.
	 */
	async getTokenID(tokenID: number): Promise<MetadataResponse> {
		try {
			return await this.metadataStorage.getTokenIDMetadata(tokenID);
		} catch (error) {
			this.logger.error(`Error in get tokenID Service: ${JSON.stringify(error)}`);
			throw error;
		}
	}

	/**
	 * Updates the metadata with the provided data.
	 *
	 * @param {UpdateMetadataRequestDTO} updateMetadataDto - The data to update the metadata with.
	 * @returns {Promise<string>} - A promise that resolves to a string indicating the success of the update.
	 * @throws {Error} - If there is an error while updating the metadata.
	 */
	async updateMetadata(updateMetadataDto: UpdateMetadataRequestDTO): Promise<string> {
		try {
			return await this.metadataStorage.updateMetadata(updateMetadataDto);
		} catch (error) {
			this.logger.error(`Error while trying to update metadata: ${error.message}`);
			throw error;
		}
	}

	/**
	 * Deletes the metadata for a given token ID.
	 *
	 * @param {number} tokenID - The ID of the token for which to delete the metadata.
	 * @returns {Promise<string>} - A promise that resolves to a string indicating the success of the deletion.
	 * @throws {Error} - If there is an error while deleting the metadata.
	 */
	async deleteMetadata(tokenID: number): Promise<string> {
		try {
			return await this.metadataStorage.deleteMetadata(tokenID);
		} catch (error) {
			this.logger.error(`Error while trying to delete metadata: ${error.message}`);
			throw error;
		}
	}
}
