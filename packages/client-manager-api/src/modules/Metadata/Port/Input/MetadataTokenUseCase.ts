import { UpdateMetadataRequestDTO, RegisterMetadataRequestDTO } from '@/src/modules/Metadata/Domain/Dto/HTTPRequest';
import { MetadataResponse } from '@/src/modules/Metadata/Domain/Dto/HTTPResponse/MetadataResponse';

export interface MetadataTokenUseCase {
	registerMetadata(registerMetadata: RegisterMetadataRequestDTO): Promise<string>;
	getTokenID(tokenID: number): Promise<MetadataResponse>;
	updateMetadata(updateMetadataDto: UpdateMetadataRequestDTO): Promise<string>;
	deleteMetadata(tokenID: number): Promise<string>;
}
