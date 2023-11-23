import { RegisterMetadataDTORequest } from '../../Domain/Dto/HTTPRequest/MetadataRequestDTO';

export interface MetadataTokenOutputPort {
	registerMetadata(registerMetadata: RegisterMetadataDTORequest): Promise<string>;
}
