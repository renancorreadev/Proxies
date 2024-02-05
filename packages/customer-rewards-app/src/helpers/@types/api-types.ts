export interface UserRegisterParamsType {
  email: string;
  username: string;
  password: string;
  profileImageUrl?: string;
  isAdmin?: boolean;
}

interface User {
  email: string;
  username: string;
  walletAddress: string;
  profileImageUrl?: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface UserRegisterResponse {
  message: string;
  user: User;
}
