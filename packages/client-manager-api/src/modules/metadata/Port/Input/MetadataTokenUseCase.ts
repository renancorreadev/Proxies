import { UpdateMetadataRequestDTO, RegisterMetadataRequestDTO } from '@metadata/Domain/Dto/HTTPRequest';
import { MetadataResponse } from '@metadata/Domain/Dto/HTTPResponse/MetadataResponse';

export interface MetadataTokenUseCase {
	registerMetadata(registerMetadata: RegisterMetadataRequestDTO): Promise<string>;
	getTokenID(tokenID: number): Promise<MetadataResponse>;
	updateMetadata(updateMetadataDto: UpdateMetadataRequestDTO): Promise<string>;
	deleteMetadata(tokenID: number): Promise<string>;
}
