import { IArea } from "@/interfaces/IArea";
import { IRole } from "@/interfaces/IRole";
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
    fetchTechnicals: builder.query<IUser[] | [], void>({
      query: () => ({
        url: `/sign/findTechnicals`,
        method: "GET",
      }),
    }),
    fetchUsers: builder.query<IUser[] | [], void>({
      query: () => ({
        url: `/sign/findAll`,
        method: "GET",
      }),
    }),
    uploadUsers: builder.mutation<IUser[], {excel_base64:string; type:string}>({
      query: ({excel_base64, type} ) => ({
        url: `/sign/importUsersByExcel/${type}`,
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
    fetchRoles: builder.query<IRole[] | [], void>({
      query: () => ({
        url: `/role/findAllRoles`,
        method: "GET",
      }),
    }),
    saveUser: builder.mutation<IUser, {
      username:string;
      email:string;
      first_name:string;
      last_name:string;
      role:number
    }>({
      query: ({ username, email, first_name, last_name, role }) => ({
        url: "/sign/save",
        method: "POST", 
        data: {
          username,
          email,
          first_name,
          last_name,
          role
        },
      }),
    }),
    fetchUserById: builder.query<IUser, {id:number}>({
      query: ({id}) => ({
        url: `/sign/findById/${id}`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation<IUser, { id: number }>({
      query: ({ id }) => ({
        url: `/sign/delete/${id}`,
        method: "DELETE"
      }),
    }),
  }),
});

export const { 
  useFetchDirectorsQuery, 
  useFetchManagersQuery,
  useFetchUsersQuery,
  useUploadUsersMutation,
  useUpdateUserMutation,
  useFetchRolesQuery,
  useSaveUserMutation,
  useFetchUserByIdQuery,
  useDeleteUserMutation,
  useFetchTechnicalsQuery
} = userService;
