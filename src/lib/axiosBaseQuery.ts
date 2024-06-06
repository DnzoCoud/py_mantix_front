import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig, AxiosError } from "axios";
import serverInstance from "@/Utils/axios";

type AxiosBaseQueryArgs = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

const axiosBaseQuery: BaseQueryFn<
  AxiosBaseQueryArgs,
  unknown,
  unknown
> = async ({ url, method, data, params, headers }) => {
  try {
    const result = await serverInstance({ url, method, data, params, headers });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export default axiosBaseQuery;