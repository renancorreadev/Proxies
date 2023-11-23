import { SaveMetadataStorageDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataStorageDTORequest';

export interface MetadataStorageOutputPort {
	saveMetadata(saveMetadata: SaveMetadataStorageDTORequest): Promise<string>;
}
