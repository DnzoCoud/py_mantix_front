import { IEvent } from "@/interfaces/IEvent";
import axiosBaseQuery from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const eventService = createApi({
  reducerPath: "eventApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    addEvent: builder.mutation<IEvent, { start: Date; end?:Date; maquina:string; status: number }>({
      query: ({ start, end, maquina, status=1 }) => ({
        url: "/event/save",
        method: "POST", 
        data: {
            start,
            end,
            maquina,
            status
        },
      }),
    }),
    fetchEvents: builder.query<IEvent[] | [], void>({
      query: () => ({
        url: `/event/findAll`,
        method: "GET",
      }),
    }),
    findEventById: builder.query<IEvent|null, { id?: number }>({
      query: ({ id }) => ({
        url: `/event/findById/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddEventMutation, useFetchEventsQuery, useFindEventByIdQuery } =
eventService;
