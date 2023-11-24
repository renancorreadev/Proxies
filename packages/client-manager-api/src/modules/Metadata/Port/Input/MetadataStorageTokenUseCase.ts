import { UpdateMetadataRequestDTO, SaveMetadataStorageDTORequest } from '@/src/modules/Metadata/Domain/Dto/HTTPRequest';
import { MetadataResponse } from '@/src/modules/Metadata/Domain/Dto/HTTPResponse/MetadataResponse';

export interface MetadataStorageOutputPort {
	saveMetadata(saveMetadata: SaveMetadataStorageDTORequest): Promise<string>;
	getTokenID(tokenID: number): Promise<MetadataResponse>;
	updateMetadata(updateMetadataDto: UpdateMetadataRequestDTO): Promise<string>;
	deleteMetadata(tokenID: number): Promise<string>;
}
