import { ILocation } from "@/interfaces/ILocation";
import axiosBaseQuery from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const locationService = createApi({
  reducerPath: "locationApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    addLocation: builder.mutation<
      ILocation,
      { name: string; area: number; manager: number }
    >({
      query: ({ name, area, manager }) => ({
        url: "/location/save",
        method: "POST",
        data: {
          name,
          area,
          manager,
        },
      }),
    }),
    fetchLocations: builder.query<ILocation[] | [], void>({
      query: () => ({
        url: `/location/findAll`,
        method: "GET",
      }),
    }),
    findLocationById: builder.query<ILocation | null, { id?: number }>({
      query: ({ id }) => ({
        url: `/location/findById/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddLocationMutation,
  useFetchLocationsQuery,
  useFindLocationByIdQuery,
} = locationService;
