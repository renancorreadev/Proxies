import { MetadataAttribute } from '../../../Adapters/Output/Entity/MetadataEntity';

export interface SaveMetadataStorageDTORequest {
	tokenID: number;
	customer: string;
	description: string;
	image: string;
	insight: string;
	attributes: MetadataAttribute[];
}
