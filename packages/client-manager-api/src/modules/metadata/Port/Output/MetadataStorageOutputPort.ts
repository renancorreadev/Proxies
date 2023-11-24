import { RegisterMetadataDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataRequestDTO';
import { MetadataResponse } from '../../Domain/Dto/HTTPResponse/MetadataResponse';

export interface MetadataStorageOutputPort {
	saveMetadata(registerMetadata: RegisterMetadataDTORequest): Promise<string>;
	getTokenIDMetadata(tokenID: number): Promise<MetadataResponse>;
}
