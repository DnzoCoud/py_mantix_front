import { IArea } from "@/interfaces/IArea";
import { IMaquina } from "@/interfaces/IMaquina";
import axiosBaseQuery from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const machineService = createApi({
  reducerPath: "machineApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    addMachine: builder.mutation<IMaquina, { name: string; model:string; serial:string;location: number }>({
      query: ({ name, model, serial, location }) => ({
        url: "/machine/save",
        method: "POST", 
        data: {
          name,
          model,
          serial,
          location,
          status: 1
        },
      }),
    }),
    fetchMachines: builder.query<IMaquina[] | [], void>({
      query: () => ({
        url: `/machine/findAll`,
        method: "GET",
      }),
    }),
    findMachineById: builder.query<IMaquina|null, { id?: number }>({
      query: ({ id }) => ({
        url: `/machine/findById/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddMachineMutation, useFetchMachinesQuery, useFindMachineByIdQuery } =
  machineService;
