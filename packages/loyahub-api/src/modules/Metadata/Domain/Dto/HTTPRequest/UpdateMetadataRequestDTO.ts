export interface UpdateMetadataRequestBody {
	tokenID: number;
	customer: string;
	description: string;
	image: string;
	insight: string;
	attributes: {
		points?: number;
		level?: number;
		benefits?: {
			level_type?: string;
			value?: number;
		}[];
	};
}

export interface UpdateMetadataRequestDTO {
	tokenID: number;
	metadataUpdate: UpdateMetadataRequestBody;
}
