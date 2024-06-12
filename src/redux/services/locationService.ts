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
    updateLocation: builder.mutation<ILocation, Partial<ILocation>>({
      query: (updatedLocationData) => ({
        url: "/location/update",
        method: "PATCH",
        data: {
          ...updatedLocationData,
        },
      }),
    }),
    uploadLocations: builder.mutation<ILocation[], {excel_base64:string}>({
      query: ({excel_base64} ) => ({
        url: "/location/importLocationsByExcel",
        method: "POST",
        data: {
          excel_base64
        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      }),
    })   
  }),
});

export const {
  useAddLocationMutation,
  useFetchLocationsQuery,
  useFindLocationByIdQuery,
  useUpdateLocationMutation,
  useUploadLocationsMutation
} = locationService;
