import { useAuthStore } from "@/stores/auth/authStore";
import axios, { AxiosInstance } from "axios";

const createServerInstance = (): AxiosInstance => {
  const accesToken = useAuthStore.getState().getToken();
  
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
      "Content-Type": "application/json",
      Authorization: accesToken ? `Token ${accesToken}` : null,
    },
  });
  return axiosInstance;
};

export default createServerInstance;
