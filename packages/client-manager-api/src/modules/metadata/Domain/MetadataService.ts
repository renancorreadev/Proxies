import { Inject, Injectable, Logger } from '@nestjs/common';
import { DependencyInjectionTokens } from '@src/helper/AppConstants';

import { MetadataTokenOutputPort } from '../Port/Output/MetadataTokenOutputPort';
import { MetadataTokenUseCase } from '../Port/Input/MetadataTokenUseCase';
import { RegisterMetadataDTORequest } from './Dto/HTTPRequest/MetadataRequestDTO';

import { MetadataEntity } from '../Adapters/Output/Entity/MetadataEntity';

@Injectable()
export class MetadataService implements MetadataTokenUseCase {
	private readonly logger = new Logger('MetadataService');

	constructor(
		@Inject(DependencyInjectionTokens.METADATA_TOKEN_OUTPUT_PORT)
		private metadataAdapter: MetadataTokenOutputPort,
	) {}

	async registerMetadata(registerMetadata: RegisterMetadataDTORequest): Promise<string> {
		try {
			return await this.metadataAdapter.registerMetadata(registerMetadata);
		} catch (error) {
			this.logger.error(`Error in Values MetadataService Service: ${error}`);
			throw new Error(`Error in Values MetadataService Service: ${error}`);
		}
	}

	async getTokenID(tokenID: number): Promise<MetadataEntity> {
		try {
			return await this.metadataAdapter.getTokenID(tokenID);
		} catch (error) {
			this.logger.error(`Error in Values MetadataService Service: ${error}`);
			throw new Error(`Error in Values MetadataService Service: ${error}`);
		}
	}
}
