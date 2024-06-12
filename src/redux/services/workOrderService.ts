import { IArea } from "@/interfaces/IArea";
import { IWorkOrder } from "@/interfaces/IWorkOrder";
import axiosBaseQuery from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const workOrderService = createApi({
  reducerPath: "workOrderApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    addWorkOrder: builder.mutation<IWorkOrder, { diagnosis: string; event: number; observation:string|null; cause:string|null  }>({
      query: ({ diagnosis, event, observation , cause}) => ({
        url: "/workOrder/save",
        method: "POST", 
        data: {
            diagnosis,
            event,
            observation, cause
        },
      }),
    }),
    fetchWorkOrders: builder.query<IWorkOrder[] | [], void>({
      query: () => ({
        url: `/workOrder/findAll`,
        method: "GET",
      }),
    }),
    findWorkOrderByEventId: builder.query<IWorkOrder|null, { eventId?: number }>({
      query: ({ eventId }) => ({
        url: `/workOrder/findWorkOrderByEventId/${eventId}`,
        method: "GET",
      }),
    }),
    updateWorkOrder: builder.mutation<IWorkOrder, Partial<IWorkOrder>>({
      query: (dataUpdated) => ({
        url: `/workOrder/update`,
        method: "PATCH",
        data:{
          ...dataUpdated
        }
      }),
    })
  }),
});

export const { useAddWorkOrderMutation, useFetchWorkOrdersQuery, useFindWorkOrderByEventIdQuery, useUpdateWorkOrderMutation } =
  workOrderService;
