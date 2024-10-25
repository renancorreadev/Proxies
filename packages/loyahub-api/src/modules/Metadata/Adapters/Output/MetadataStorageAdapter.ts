import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { MetadataStorageOutputPort } from '@/src/modules/Metadata/Port/Output/MetadataStorageOutputPort';
import { MetadataResponse } from '@/src/modules/Metadata/Domain/Dto/HTTPResponse/MetadataResponse';
import { RegisterMetadataRequestDTO, UpdateMetadataRequestDTO } from '@/src/modules/Metadata/Domain/Dto/HTTPRequest';

import { DependencyInjectionTokens } from '@src/helper/AppConstants';
import { MetadataEntity } from './Entity/MetadataEntity';
import { ApplicationError, ContractError } from '@helper/APIErrors';

@Injectable()
/**
 * Adapter for interacting with the metadata storage.
 */
export class MetadataStorageAdapter implements MetadataStorageOutputPort {
	private readonly logger = new Logger('MetadataStorageAdapter');
	private readonly metadataRepository: Repository<MetadataEntity>;

	constructor(
		@Inject(DependencyInjectionTokens.DATA_SOURCE)
		private readonly dataSource: DataSource,
	) {
		this.metadataRepository = dataSource.getRepository(MetadataEntity);
	}

	/**
	 * Retrieves the metadata for a given ERC721 token ID.
	 *
	 * @param {number} tokenID - The ID of the token for which to retrieve the metadata.
	 * @returns {Promise<MetadataResponse>} A promise that resolves to the metadata for the given token ID.
	 * @throws {Error} If no metadata is found for the given token ID.
	 */
	async saveMetadata(saveMetadata: RegisterMetadataRequestDTO): Promise<string> {
		try {
			const existingMetadata = await this.metadataRepository.findOne({
				where: { tokenID: saveMetadata.tokenID },
			});

			if (existingMetadata) {
				throw new Error(`Metadata already exists for tokenID: ${saveMetadata.tokenID}`);
			}

			if (!saveMetadata.customer || !saveMetadata.description || !saveMetadata.image || !saveMetadata.insight) {
				throw new Error('Missing required fields');
			}

			const newMetadata = new MetadataEntity(
				saveMetadata.tokenID,
				saveMetadata.customer,
				saveMetadata.description,
				saveMetadata.image,
				saveMetadata.insight,
				saveMetadata.attributes,
			);

			await this.metadataRepository.save(newMetadata);

			return 'Metadata saved successfully';
		} catch (error) {
			this.logger.error(`Error in Metadata Storage Token  ${JSON.stringify(error)}`);
			throw new Error(`An error ocurred while saving the Metadata in Database: ${JSON.stringify(error)}`);
		}
	}

	/**
	 * Retrieves the metadata for a given token ID.
	 *
	 * @param {number} tokenID - The ID of the token for which to retrieve the metadata.
	 * @returns {Promise<MetadataResponse>} A promise that resolves to the metadata for the given token ID.
	 * @throws {Error} If no metadata is found for the given token ID.
	 */
	async getTokenIDMetadata(tokenID: number): Promise<MetadataResponse> {
		try {
			const metadata = await this.metadataRepository.findOne({ where: { tokenID } });

			if (!metadata) {
				throw new ApplicationError({
					code: HttpStatus.NOT_FOUND,
					message: `Metadata not found for tokenID: ${tokenID}`,
				});
			}

			return metadata;
		} catch (error) {
			this.logger.error(`Error when getting the token metadata: ${JSON.stringify(error)}`);

			if (error instanceof ApplicationError || error instanceof ContractError) {
				throw error;
			}
			// Para outros tipos de erro, envolva em um ContractError
			throw new ContractError(`An error occurred while getting the token metadata: ${error.message}`);
		}
	}

	/**
	 * Updates the metadata for a given token ID.
	 *
	 * @param {UpdateMetadataRequestDTO} updateMetadataDto - The DTO containing the updated metadata.
	 * @returns {Promise<string>} A promise that resolves to a success message when the metadata is updated.
	 * @throws {Error} If no metadata is found for the given token ID.
	 */
	async updateMetadata(updateMetadataDto: UpdateMetadataRequestDTO): Promise<string> {
		const { tokenID, ...updateData } = updateMetadataDto;

		const metadata = await this.metadataRepository.findOne({ where: { tokenID } });
		if (!metadata) {
			throw new Error(`Metadata not found for tokenID: ${tokenID}`);
		}

		// updates
		metadata.customer = updateData.metadataUpdate.customer;
		metadata.description = updateData.metadataUpdate.description;
		metadata.image = updateData.metadataUpdate.image;
		metadata.insight = updateData.metadataUpdate.insight;
		metadata.attributes = updateData.metadataUpdate.attributes;
		metadata.updatedAt = new Date();

		await this.metadataRepository.save(metadata);
		return 'Metadata updated successfully';
	}

	/**
	 * Deletes the metadata for a given token ID.
	 *
	 * @param {number} tokenID - The ID of the token for which to delete the metadata.
	 * @returns {Promise<string>} A promise that resolves to a success message when the metadata is deleted.
	 * @throws {Error} If no metadata is found for the given token ID.
	 */
	async deleteMetadata(tokenID: number): Promise<string> {
		const metadata = await this.metadataRepository.findOne({ where: { tokenID } });
		if (!metadata) {
			throw new Error(`No metadata found for tokenID: ${tokenID}`);
		}

		await this.metadataRepository.delete(metadata.id);
		return 'Metadata deleted successfully';
	}
}
