import { IArea } from "@/interfaces/IArea";
import { IUser } from "@/interfaces/IUser";
import axiosBaseQuery from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userService = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchDirectors: builder.query<IUser[] | [], void>({
      query: () => ({
        url: `/sign/findDirectors`,
        method: "GET",
      }),
    }),
    fetchManagers: builder.query<IUser[] | [], void>({
      query: () => ({
        url: `/sign/findManagers`,
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchDirectorsQuery, useFetchManagersQuery } = userService;
