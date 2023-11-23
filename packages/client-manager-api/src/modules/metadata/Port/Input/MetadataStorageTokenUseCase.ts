import { MetadataEntity } from '../../Adapters/Output/Entity/MetadataEntity';
import { SaveMetadataStorageDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataStorageDTORequest';

export interface MetadataStorageOutputPort {
	saveMetadata(saveMetadata: SaveMetadataStorageDTORequest): Promise<string>;
	getTokenID(tokenID: number): Promise<MetadataEntity>;
}
