import axios from 'axios';
import {
  UserRegisterParamsType,
  UserRegisterResponse,
} from '../@types/api-types';

const apiUrl = import.meta.env.VITE_CUSTOMER_API;

const api = axios.create({
  baseURL: apiUrl,
});

export const login = async (email: string, password: string) => {
  return await api.post('auth/login', { email, password });
};

export const register = async (registerParams: UserRegisterParamsType) => {
  const { email, username, password, profileImageUrl, isAdmin } =
    registerParams;
  return await api.post<UserRegisterResponse>('user/register', {
    email,
    username,
    password,
    profileImageUrl,
    isAdmin,
  });
};
