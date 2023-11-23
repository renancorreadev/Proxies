import { RegisterMetadataDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataRequestDTO';

export interface MetadataTokenUseCase {
	registerMetadata(registerMetadata: RegisterMetadataDTORequest): Promise<string>;
}
