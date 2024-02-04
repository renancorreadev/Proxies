import axios from 'axios';

const apiUrl = import.meta.env.VITE_CUSTOMER_API;

const api = axios.create({
  baseURL: apiUrl,
});

export const login = async (email: string, password: string) => {
  return api.post('auth/login', { email, password });
};

export const register = async (
  email: string,
  password: string,
  isAdmin: boolean = false
) => {
  return api.post('user/register', { email, password, isAdmin });
};
