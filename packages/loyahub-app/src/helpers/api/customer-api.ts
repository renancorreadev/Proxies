import axios from 'axios';
import {
  UserRegisterParamsType,
  UserRegisterResponse,
} from '../@types/api-types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const apiUrl = import.meta.env.VITE_CUSTOMER_API;

const api = axios.create({
  baseURL: apiUrl,
});

export const login = async (email: string, password: string) => {
  return await api.post('auth/login', { email, password });
};

export const register = async (registerParams: UserRegisterParamsType) => {
  const { email, username, password, profileImageUrl, isAdmin, age, address } =
    registerParams;

  return await api.post<UserRegisterResponse>('user/register', {
    email,
    username,
    password,
    profileImageUrl,
    isAdmin,
    age,
    address,
  });
};

interface UserResponse {
  id: number;
  username: string;
  email: string;
  walletAddress: string;
  profileImageUrl: string;
  isAdmin: boolean;
}
export const getUser = async (email: string): Promise<UserResponse> => {
  try {
    const response = await api.get(`user/get/${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw error;
  }
};
