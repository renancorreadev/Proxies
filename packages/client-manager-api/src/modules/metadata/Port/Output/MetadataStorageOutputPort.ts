import { SaveMetadataStorageDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataStorageDTORequest';

export interface MetadataStorageOutputPort {
	saveMetadata(registerMetadata: SaveMetadataStorageDTORequest): Promise<string>;
}
