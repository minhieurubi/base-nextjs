import axios from 'axios';
import { getAccessToken } from '@/ultis/cookie';

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

baseApi.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? getAccessToken() : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

baseApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response);
    }
    return Promise.reject(error);
  }
);

export default baseApi;
