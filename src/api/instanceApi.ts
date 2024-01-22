import axios from 'axios';
import { BASE_URL, DEFAULT_HEADERS } from './const';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { ...DEFAULT_HEADERS },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') ?? '';
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
