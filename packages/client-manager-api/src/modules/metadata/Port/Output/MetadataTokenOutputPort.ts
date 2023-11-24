import { RegisterMetadataDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataRequestDTO';
import { MetadataResponse } from '../../Domain/Dto/HTTPResponse/MetadataResponse';

export interface MetadataTokenOutputPort {
	registerMetadata(registerMetadata: RegisterMetadataDTORequest): Promise<string>;
	getTokenID(tokenID: number): Promise<MetadataResponse>;
}
