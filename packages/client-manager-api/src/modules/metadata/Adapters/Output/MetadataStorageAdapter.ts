import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from '@src/helper/AppConstants';
import { DataSource, Repository } from 'typeorm';

import { MetadataEntity } from './Entity/MetadataEntity';

import { MetadataStorageOutputPort } from '../../Port/Output/MetadataStorageOutputPort';
import { SaveMetadataStorageDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataStorageDTORequest';

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

	async saveMetadata(saveMetadata: SaveMetadataStorageDTORequest): Promise<string> {
		try {
			const newMetadata = new MetadataEntity(saveMetadata.title, saveMetadata.description);

			await this.metadataRepository.save(newMetadata);

			return 'Metadata saved successfully';
		} catch (error) {
			this.logger.error(`Error in Metadata Storage Token  ${JSON.stringify(error)}`);
			throw new Error(`An error ocurred while saving FIAT currency: ${JSON.stringify(error)}`);
		}
	}
}
