import axios from 'axios';

export const axiosConfig = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});
