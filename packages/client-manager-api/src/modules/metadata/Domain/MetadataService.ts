import { Inject, Injectable, Logger } from '@nestjs/common';
import { DependencyInjectionTokens } from '@src/helper/AppConstants';

import { MetadataTokenOutputPort } from '../Port/Output/MetadataTokenOutputPort';
import { MetadataTokenUseCase } from '../Port/Input/MetadataTokenUseCase';
import { RegisterMetadataDTORequest } from './Dto/HTTPRequest/MetadataRequestDTO';

import { MetadataResponse } from './Dto/HTTPResponse/MetadataResponse';

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

	async getTokenID(tokenID: number): Promise<MetadataResponse> {
		try {
			const metadata = await this.metadataAdapter.getTokenID(tokenID);

			const mappedMetadata: MetadataResponse = {
				tokenID: metadata.tokenID,
				customer: metadata.customer,
				description: metadata.description,
				image: metadata.image,
				insight: metadata.insight,
				attributes: {
					level: metadata.attributes.level,
					points: metadata.attributes.points,
					benefits: metadata.attributes.benefits.map((benefit) => ({
						level_type: benefit.level_type,
						nftType: benefit.nftType,
						value: benefit.value,
					})),
				},
			};

			return mappedMetadata;
		} catch (error) {
			this.logger.error(`Error in get Metadata MetadataService : ${error}`);
			throw new Error(`Error in get Metadata MetadataService : ${error}`);
		}
	}
}
