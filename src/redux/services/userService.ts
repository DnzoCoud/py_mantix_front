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
    fetchUsers: builder.query<IUser[] | [], void>({
      query: () => ({
        url: `/sign/findAll`,
        method: "GET",
      }),
    }),
    uploadUsers: builder.mutation<IUser[], {excel_base64:string}>({
      query: ({excel_base64} ) => ({
        url: "/sign/importUsersByExcel",
        method: "POST",
        data: {
          excel_base64
        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      }),
    }),
    updateUser: builder.mutation<IUser, Partial<IUser>>({
      query: (updatedUser) => ({
        url: "/sign/update",
        method: "PATCH",
        data: {
          ...updatedUser,
        },
      }),
    }),
  }),
});

export const { 
  useFetchDirectorsQuery, 
  useFetchManagersQuery,
  useFetchUsersQuery,
  useUploadUsersMutation,
  useUpdateUserMutation
} = userService;
