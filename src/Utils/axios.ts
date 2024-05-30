import { useAuthStore } from "@/stores/auth/authStore";
import axios, { AxiosInstance } from "axios";

const createServerInstance = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const accesToken = useAuthStore.getState().getToken();
      config.headers.Authorization = accesToken ? `Token ${accesToken}` : 'Token '
      
      return config
    },
    (error) => Promise.reject(error)
  )
  return axiosInstance;
};

const serverInstance = createServerInstance();

export default serverInstance;
