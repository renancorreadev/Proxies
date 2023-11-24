import { DeleteMetadataRequestDTO } from '../../Domain/Dto/HTTPRequest/DeleteMetadataRequestDTO';
import { SaveMetadataStorageDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataStorageDTORequest';
import { UpdateMetadataRequestDTO } from '../../Domain/Dto/HTTPRequest/UpdateMetadataRequestDTO';
import { MetadataResponse } from '../../Domain/Dto/HTTPResponse/MetadataResponse';

export interface MetadataStorageOutputPort {
	saveMetadata(saveMetadata: SaveMetadataStorageDTORequest): Promise<string>;
	getTokenID(tokenID: number): Promise<MetadataResponse>;
	updateMetadata(updateMetadataDto: UpdateMetadataRequestDTO): Promise<string>;
	deleteMetadata(tokenID: number): Promise<string>;
}
