import { RegisterMetadataRequestDTO, UpdateMetadataRequestDTO } from '@/src/modules/Metadata/Domain/Dto/HTTPRequest';
import { MetadataResponse } from '@/src/modules/Metadata/Domain/Dto/HTTPResponse/MetadataResponse';

export interface MetadataStorageOutputPort {
	saveMetadata(registerMetadata: RegisterMetadataRequestDTO): Promise<string>;
	getTokenIDMetadata(tokenID: number): Promise<MetadataResponse>;
	updateMetadata(updateMetadataDto: UpdateMetadataRequestDTO): Promise<string>;
	deleteMetadata(tokenID: number): Promise<string>;
}
