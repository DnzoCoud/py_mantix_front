import { IEvent } from "@/interfaces/IEvent";
import axiosBaseQuery from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const eventService = createApi({
  reducerPath: "eventApi",
  baseQuery: axiosBaseQuery,
  tagTypes: ["Events", "EventsByDay"],
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
      providesTags: ["Events"],
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
      providesTags: ["EventsByDay"],
    }),
    updateEvent: builder.mutation<IEvent, Partial<IEvent>>({
      query: (updatedEventData) => ({
        url: "/event/update",
        method: "PATCH",
        data: {
          ...updatedEventData,
        },
      }),
    }),
    uploadEvents: builder.mutation<IEvent[], { excel_base64: string }>({
      query: ({ excel_base64 }) => ({
        url: "/event/importEventsByExcel",
        method: "POST",
        data: {
          excel_base64,
        },
      }),
    }),
    reprogramRequest: builder.mutation<
      IEvent,
      { event: number; action: boolean }
    >({
      query: ({ event, action }) => ({
        url: "/event/reprogram_request",
        method: "POST",
        data: {
          event,
          action,
        },
      }),
      invalidatesTags: ["Events", "EventsByDay"],
    }),
  }),
});

export const {
  useAddEventMutation,
  useFetchEventsQuery,
  useFindEventByIdQuery,
  useFindEventsByDayQuery,
  useUpdateEventMutation,
  useUploadEventsMutation,
  useReprogramRequestMutation,
} = eventService;
