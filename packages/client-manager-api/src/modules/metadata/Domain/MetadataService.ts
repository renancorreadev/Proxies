import { Inject, Injectable, Logger } from '@nestjs/common';
import { DependencyInjectionTokens } from '@src/helper/AppConstants';

import { MetadataTokenOutputPort } from '../Port/Output/MetadataTokenOutputPort';
import { MetadataTokenUseCase } from '../Port/Input/MetadataTokenUseCase';
import { RegisterMetadataDTORequest } from './Dto/HTTPRequest/MetadataRequestDTO';

@Injectable()
export class MetadataService implements MetadataTokenUseCase {
	private readonly logger = new Logger('ValuesTransferService');

	constructor(
		@Inject(DependencyInjectionTokens.METADATA_TOKEN_OUTPUT_PORT)
		private metadataAdapter: MetadataTokenOutputPort,
	) {}

	registerMetadata(registerMetadata: RegisterMetadataDTORequest): Promise<string> {
		try {
			return this.metadataAdapter.registerMetadata(registerMetadata);
		} catch (error) {
			this.logger.error(`Error in Values MetadataService Service: ${error}`);
			throw new Error(`Error in Values MetadataService Service: ${error}`);
		}
	}
}
