export interface MetadataResponse {
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
			nftType?: string;
			value?: number;
		}[];
	};
}
