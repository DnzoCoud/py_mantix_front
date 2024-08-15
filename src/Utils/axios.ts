import { useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
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
      if (typeof window !== "undefined") {
        const accessToken = localStorage.getItem("serverToken");
        config.headers.Authorization = accessToken
          ? `Token ${accessToken}`
          : "Token ";
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
  return axiosInstance;
};

const serverInstance = createServerInstance();

export default serverInstance;
