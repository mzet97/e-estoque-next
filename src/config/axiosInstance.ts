import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    // Só adiciona o header se houver token válido
    if (session?.user?.externalToken && config.headers && session.user.externalToken !== 'null') {
      config.headers.Authorization = `Bearer ${session.user.externalToken}`;
    } else {
      // Remove o header se não houver token
      if (config.headers?.Authorization) {
        delete config.headers.Authorization;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
