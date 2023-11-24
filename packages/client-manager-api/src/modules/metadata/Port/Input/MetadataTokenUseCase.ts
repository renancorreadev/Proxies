import { MetadataEntity } from '../../Adapters/Output/Entity/MetadataEntity';
import { DeleteMetadataRequestDTO } from '../../Domain/Dto/HTTPRequest/DeleteMetadataRequestDTO';
import { RegisterMetadataRequestDTO } from '../../Domain/Dto/HTTPRequest/RegisterMetadataRequestDTO';
import { UpdateMetadataRequestDTO } from '../../Domain/Dto/HTTPRequest/UpdateMetadataRequestDTO';
import { MetadataResponse } from '../../Domain/Dto/HTTPResponse/MetadataResponse';

export interface MetadataTokenUseCase {
	registerMetadata(registerMetadata: RegisterMetadataRequestDTO): Promise<string>;
	getTokenID(tokenID: number): Promise<MetadataResponse>;
	updateMetadata(updateMetadataDto: UpdateMetadataRequestDTO): Promise<string>;
	deleteMetadata(tokenID: number): Promise<string>;
}
