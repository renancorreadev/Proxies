import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from '@src/helper/AppConstants';
import { DataSource, Repository } from 'typeorm';

import { MetadataEntity } from './Entity/MetadataEntity';
import { MetadataStorageOutputPort } from '../../Port/Output/MetadataStorageOutputPort';
import { MetadataResponse } from '../../Domain/Dto/HTTPResponse/MetadataResponse';
import { RegisterMetadataDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataRequestDTO';

@Injectable()
export class MetadataStorageAdapter implements MetadataStorageOutputPort {
	private readonly logger = new Logger('PaymentTokenToFiatAdapter');
	private readonly metadataRepository: Repository<MetadataEntity>;

	constructor(
		@Inject(DependencyInjectionTokens.DATA_SOURCE)
		private readonly dataSource: DataSource,
	) {
		this.metadataRepository = dataSource.getRepository(MetadataEntity);
	}

	async saveMetadata(saveMetadata: RegisterMetadataDTORequest): Promise<string> {
		try {
			const existingMetadata = await this.metadataRepository.findOne({
				where: { tokenID: saveMetadata.tokenID },
			});

			if (existingMetadata) {
				throw new Error(`Metadata already exists for tokenID: ${saveMetadata.tokenID}`);
			}

			// Valide os campos obrigatórios aqui, por exemplo:
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
			throw new Error(`An error ocurred while saving FIAT currency: ${JSON.stringify(error)}`);
		}
	}
	async getTokenIDMetadata(tokenID: number): Promise<MetadataResponse> {
		try {
			const metadata = await this.metadataRepository.findOne({
				where: { tokenID },
			});

			if (!metadata) {
				throw new Error(`Metadata not found for tokenID: ${tokenID}`);
			}

			return metadata;
		} catch (error) {
			this.logger.error(`Error while retrieving metadata: ${JSON.stringify(error)}`);
			throw error;
		}
	}
}
