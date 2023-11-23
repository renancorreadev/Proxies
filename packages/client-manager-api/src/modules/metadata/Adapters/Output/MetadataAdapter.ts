import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from '@src/helper/AppConstants';
import { MetadataTokenOutputPort } from '../../Port/Output/MetadataTokenOutputPort';
import { MetadataStorageOutputPort } from '../../Port/Output/MetadataStorageOutputPort';
import { RegisterMetadataDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataRequestDTO';

import { MetadataEntity } from './Entity/MetadataEntity';

@Injectable()
export class MetadataAdapter implements MetadataTokenOutputPort {
	private readonly logger = new Logger(MetadataAdapter.name);

	constructor(
		@Inject(DependencyInjectionTokens.METADATA_STORAGE_OUTPUT_PORT)
		private metadataStorage: MetadataStorageOutputPort,
	) {}

	async registerMetadata(registerMetadata: RegisterMetadataDTORequest): Promise<string> {
		try {
			await this.metadataStorage.saveMetadata(registerMetadata);
			return 'Metadata succesfully registered';
		} catch (error) {
			this.logger.error(`Error while trying to registerMetadata: ${error}`);
			throw new Error(`Error while trying to registerMetadata: ${error}`);
		}
	}

	async getTokenID(tokenID: number): Promise<MetadataEntity> {
		try {
			return await this.metadataStorage.getTokenIDMetadata(tokenID);
		} catch (error) {
			this.logger.error(`Error while trying to registerMetadata: ${error}`);
			throw new Error(`Error while trying to registerMetadata: ${error}`);
		}
	}
}
