import { Inject, Injectable, Logger } from '@nestjs/common';

import { DependencyInjectionTokens } from '@src/helper/AppConstants';
import { MetadataTokenOutputPort } from '../../Port/Output/MetadataTokenOutputPort';
import { MetadataStorageOutputPort } from '../../Port/Output/MetadataStorageOutputPort';
import { RegisterMetadataDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataRequestDTO';

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
			return 'Token succesfully swapped to FIAT';
		} catch (error) {
			this.logger.error(`Error while trying to swap to FIAT: ${error}`);
			throw new Error(`Error while trying to swap to FIAT: ${error}`);
		}
	}
}
