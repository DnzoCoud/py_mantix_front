import { IAuth } from "@/interfaces/auth/IAuth";
import axiosBaseQuery from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
export const authService = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    login: builder.query<IAuth, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/sign/login",
        method: "POST",
        data: {
          email,
          password,
        },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/sign/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginQuery, useLogoutMutation } = authService;