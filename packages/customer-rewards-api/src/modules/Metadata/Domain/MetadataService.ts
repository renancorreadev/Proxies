import { Inject, Injectable, Logger } from '@nestjs/common';
import { DependencyInjectionTokens } from '@src/helper/AppConstants';

import { MetadataTokenOutputPort } from '../Port/Output/MetadataTokenOutputPort';
import { MetadataTokenUseCase } from '../Port/Input/MetadataTokenUseCase';
import { RegisterMetadataRequestDTO } from './Dto/HTTPRequest/RegisterMetadataRequestDTO';

import { MetadataResponse } from './Dto/HTTPResponse/MetadataResponse';
import { DeleteMetadataRequestDTO, UpdateMetadataRequestDTO } from './Dto/HTTPRequest';
import { ApplicationError, ContractError } from '@helper/APIErrors';

@Injectable()
export class MetadataService implements MetadataTokenUseCase {
	private readonly logger = new Logger('MetadataService');

	constructor(
		@Inject(DependencyInjectionTokens.METADATA_TOKEN_OUTPUT_PORT)
		private metadataAdapter: MetadataTokenOutputPort,
	) {}

	async registerMetadata(registerMetadata: RegisterMetadataRequestDTO): Promise<string> {
		try {
			return await this.metadataAdapter.registerMetadata(registerMetadata);
		} catch (error) {
			this.logger.error(`Error in Authorization Service: ${JSON.stringify(error)}`);
			if (error instanceof ApplicationError || error instanceof ContractError) {
				throw error;
			}
			throw new Error(`An error ocurred while creating authorization token: ${error.message}`);
		}
	}

	async getTokenID(tokenID: number): Promise<MetadataResponse> {
		try {
			const metadata = await this.metadataAdapter.getTokenID(tokenID);

			if (!metadata) {
				throw new Error(`Metadata not found for tokenID: ${tokenID}`);
			}

			// const mappedMetadata: MetadataResponse = {
			// 	tokenID: metadata.tokenID,
			// 	customer: metadata.customer,
			// 	description: metadata.description,
			// 	image: metadata.image,
			// 	insight: metadata.insight,
			// 	attributes: {
			// 		level: metadata.attributes.level,
			// 		points: metadata.attributes.points,
			// 		benefits: metadata.attributes.benefits.map((benefit) => ({
			// 			level_type: benefit.level_type,
			// 			nftType: benefit.nftType,
			// 			value: benefit.value,
			// 		})),
			// 	},
			// };

			return metadata;
		} catch (error) {
			this.logger.error(`Error in get tokenID Service: ${JSON.stringify(error)}`);
			if (error instanceof ApplicationError || error instanceof ContractError) {
				throw error;
			}
			throw new Error(`An error ocurred while getting metadata token in service: ${error.message}`);
		}
	}

	async updateMetadata(updateMetadataDto: UpdateMetadataRequestDTO): Promise<string> {
		try {
			const { tokenID, metadataUpdate } = updateMetadataDto;
			return await this.metadataAdapter.updateMetadata({
				tokenID,
				metadataUpdate,
			});
		} catch (error) {
			this.logger.error(`Error in updateMetadata service: ${error.message}`);
			throw new Error(`Error in updateMetadata service: ${error.message}`);
		}
	}

	async deleteMetadata(tokenID: number): Promise<string> {
		try {
			return await this.metadataAdapter.deleteMetadata(tokenID);
		} catch (error) {
			this.logger.error(`Error in deleteMetadata service: ${error.message}`);
			throw new Error(`Error in deleteMetadata service: ${error.message}`);
		}
	}
}
