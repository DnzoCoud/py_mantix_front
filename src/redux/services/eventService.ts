import { IEvent } from "@/interfaces/IEvent";
import axiosBaseQuery from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const eventService = createApi({
  reducerPath: "eventApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    addEvent: builder.mutation<
      IEvent,
      { start: string; end: string; machine: number; status: number }
    >({
      query: ({ start, end, machine, status = 1 }) => ({
        url: "/event/save",
        method: "POST",
        data: {
          start,
          end,
          machine,
          status,
        },
      }),
    }),
    fetchEvents: builder.query<IEvent[] | [], void>({
      query: () => ({
        url: `/event/findAll`,
        method: "GET",
      }),
    }),
    findEventById: builder.query<IEvent | null, { id?: number }>({
      query: ({ id }) => ({
        url: `/event/findById/${id}`,
        method: "GET",
      }),
    }),
    findEventsByDay: builder.query<IEvent[] | [], { date: Date | string }>({
      query: ({ date }) => ({
        url: `/event/findByDay/?start=${date}`,
        method: "GET",
      }),
    }),
    updateEvent: builder.mutation<
      IEvent,Partial<IEvent>
    >({
      query: (updatedEventData ) => ({
        url: "/event/update",
        method: "PATCH",
        data: {
          ...updatedEventData,
        },
      }),
    }),
  }),
});

export const {
  useAddEventMutation,
  useFetchEventsQuery,
  useFindEventByIdQuery,
  useFindEventsByDayQuery,
  useUpdateEventMutation,
} = eventService;
