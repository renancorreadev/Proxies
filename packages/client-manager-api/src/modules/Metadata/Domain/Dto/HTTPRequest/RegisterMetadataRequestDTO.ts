export interface RegisterMetadataRequestDTO {
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
