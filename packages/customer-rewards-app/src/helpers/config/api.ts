import { useUserStore } from '@/store/store';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
});

api.interceptors.request.use(
  (config) => {
    const { token, isTokenValid } = useUserStore.getState();
    if (!isTokenValid()) {
      console.log('Token expired. Please log in again.');
      // Redirecione para a tela de login ou renove o token aqui
      // Por exemplo: throw new axios.Cancel("Token expired");
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
