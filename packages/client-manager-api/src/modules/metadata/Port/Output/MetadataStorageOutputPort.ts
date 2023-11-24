import { RegisterMetadataRequestDTO, UpdateMetadataRequestDTO } from '@metadata/Domain/Dto/HTTPRequest';
import { MetadataResponse } from '@metadata/Domain/Dto/HTTPResponse/MetadataResponse';

export interface MetadataStorageOutputPort {
	saveMetadata(registerMetadata: RegisterMetadataRequestDTO): Promise<string>;
	getTokenIDMetadata(tokenID: number): Promise<MetadataResponse>;
	updateMetadata(updateMetadataDto: UpdateMetadataRequestDTO): Promise<string>;
	deleteMetadata(tokenID: number): Promise<string>;
}
