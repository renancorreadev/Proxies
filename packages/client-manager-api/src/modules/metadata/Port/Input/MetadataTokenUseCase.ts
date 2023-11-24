import { MetadataEntity } from '../../Adapters/Output/Entity/MetadataEntity';
import { RegisterMetadataDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataRequestDTO';
import { MetadataResponse } from '../../Domain/Dto/HTTPResponse/MetadataResponse';

export interface MetadataTokenUseCase {
	registerMetadata(registerMetadata: RegisterMetadataDTORequest): Promise<string>;
	getTokenID(tokenID: number): Promise<MetadataResponse>;
}
