import { MetadataEntity } from '../../Adapters/Output/Entity/MetadataEntity';
import { RegisterMetadataDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataRequestDTO';

export interface MetadataTokenUseCase {
	registerMetadata(registerMetadata: RegisterMetadataDTORequest): Promise<string>;
	getTokenID(tokenID: number): Promise<MetadataEntity>;
}
