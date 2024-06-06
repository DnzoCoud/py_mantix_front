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
    findAreaById: builder.query<IArea|null, { id?: number }>({
      query: ({ id }) => ({
        url: `/area/findById/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddAreaMutation, useFetchAreasQuery, useFindAreaByIdQuery } =
  areaService;
