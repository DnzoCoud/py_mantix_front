import { IArea } from "@/interfaces/IArea";
import axiosBaseQuery from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const areaService = createApi({
  reducerPath: "areaApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    addArea: builder.mutation<IArea, { name: string; director: number }>({
      query: ({ name, director }) => ({
        url: "/area/save",
        method: "POST",
        data: {
          name,
          director,
        },
      }),
    }),
    fetchAreas: builder.query<IArea[] | [], void>({
      query: () => ({
        url: `/area/findAll`,
        method: "GET",
      }),
    }),
    findAreaById: builder.query<IArea | null, { id?: number }>({
      query: ({ id }) => ({
        url: `/area/findById/${id}`,
        method: "GET",
      }),
    }),
    updateArea: builder.mutation<IArea, Partial<IArea>>({
      query: (updatedAreaData) => ({
        url: "/area/update",
        method: "PATCH",
        data: {
          ...updatedAreaData,
        },
      }),
    }),
    uploadAreas: builder.mutation<IArea[], { excel_base64: string }>({
      query: ({ excel_base64 }) => ({
        url: "/area/importAreasByExcel",
        method: "POST",
        data: {
          excel_base64,
        },
      }),
    }),
    deleteArea: builder.mutation<IArea, { id: number }>({
      query: ({ id }) => ({
        url: `/area/delete/${id}`,
        method: "DELETE"
      }),
    }),
  }),
});

export const {
  useAddAreaMutation,
  useFetchAreasQuery,
  useFindAreaByIdQuery,
  useUpdateAreaMutation,
  useUploadAreasMutation,
  useDeleteAreaMutation
} = areaService;
