import { MetadataEntity } from '../../Adapters/Output/Entity/MetadataEntity';
import { SaveMetadataStorageDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataStorageDTORequest';

export interface MetadataStorageOutputPort {
	saveMetadata(registerMetadata: SaveMetadataStorageDTORequest): Promise<string>;
	getTokenIDMetadata(tokenID: number): Promise<MetadataEntity>;
}
