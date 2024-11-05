interface Address {
  City: string;
  Street: string;
  PostalCode: number;
  HouseNumber: string;
}

export interface UserRegisterParamsType {
  email: string;
  username: string;
  password: string;
  profileImageUrl?: string;
  isAdmin?: boolean;
  age: string;
  address: Address;
  confirmPassword?: string;
}

interface User {
  email: string;
  username: string;
  walletAddress: string;
  profileImageUrl?: string;
  isAdmin: boolean;
  age: string;
  address: Address;
  createdAt: Date;
}

export interface UserRegisterResponse {
  message: string;
  user: User;
}
