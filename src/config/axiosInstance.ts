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

    if (
      session?.user?.externalToken &&
      config.headers &&
      session.user.externalToken
    ) {
      config.headers.Authorization = `Bearer ${session.user.externalToken}`;
    } else {
      if (config.headers?.Authorization) {
        delete config.headers.Authorization;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
