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
    updateMachine: builder.mutation<IMaquina, Partial<IMaquina>>({
      query: (updatedMachineData) => ({
        url: "/machine/update",
        method: "PATCH",
        data: {
          ...updatedMachineData,
        },
      }),
    }),
    uploadMachines: builder.mutation<IMaquina[], {excel_base64:string}>({
      query: ({excel_base64} ) => ({
        url: "/machine/importMachinesByExcel",
        method: "POST",
        data: {
          excel_base64
        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      }),
    })  
  }),
});

export const { useAddMachineMutation, useFetchMachinesQuery, useFindMachineByIdQuery, useUpdateMachineMutation, useUploadMachinesMutation } =
  machineService;
