export interface Benefit {
  discount?: string;
  FreeFrete?: string;
  description: string;
  promotionLevel?: string;
  doublePoints?: string;
}

export interface Attribute {
  type: string;
  value: number | string | Benefit[];
}

export interface Metadata {
  tokenID: number;
  customer: string;
  description: string;
  image: string;
  insight: string;
  attributes: Attribute[];
  createdAt: string;
  updatedAt: string;
}
