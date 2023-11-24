import {
	RegisterMetadataRequestDTO,
	UpdateMetadataRequestDTO,
	DeleteMetadataRequestDTO,
} from '../../Domain/Dto/HTTPRequest';
import { MetadataResponse } from '../../Domain/Dto/HTTPResponse/MetadataResponse';

export interface MetadataStorageOutputPort {
	saveMetadata(registerMetadata: RegisterMetadataRequestDTO): Promise<string>;
	getTokenIDMetadata(tokenID: number): Promise<MetadataResponse>;
	updateMetadata(updateMetadataDto: UpdateMetadataRequestDTO): Promise<string>;
	deleteMetadata(tokenID: number): Promise<string>;
}
