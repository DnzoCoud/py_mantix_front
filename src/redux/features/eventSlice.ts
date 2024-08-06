import { IArea } from "@/interfaces/IArea";
import { IEvent } from "@/interfaces/IEvent";
import { DatesSetArg } from "@fullcalendar/core/index.js";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface EventState {
  PROGRAMADO: number;
  EN_EJECUCION: number;
  COMPLETADO: number;
  REPROGRAMADO: number;
  PETICION_REPROGRAMADO: number;
}

interface EventsByStatus {
  [key: string]: number;
}

const initialState = {
  events: [] as IEvent[],
  event: null as IEvent | null,
  eventsByDay: [] as IEvent[] | [],
  eventState: {
    PROGRAMADO: 1,
    EN_EJECUCION: 2,
    COMPLETADO: 3,
    REPROGRAMADO: 4,
    PETICION_REPROGRAMADO: 5,
  } as EventState,
  eventsByStatus: {} as EventsByStatus,
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<IEvent[]>) => {
      state.events = action.payload;
    },
    clearEvents: (state) => {
      state.events = [];
    },
    setEvent: (state, action: PayloadAction<IEvent>) => {
      state.events.push(action.payload);
    },
    setEventsByDay: (state, action: PayloadAction<IEvent[] | []>) => {
      state.eventsByDay = action.payload;
    },
    setUpdateEvent: (state, action: PayloadAction<IEvent>) => {
      const updatedEvent = action.payload;
      const index = state.events.findIndex(
        (event) => event.id === updatedEvent.id
      );
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
      const indexByDay = state.eventsByDay.findIndex(
        (event) => event.id === updatedEvent.id
      );
      if (indexByDay !== -1) {
        state.eventsByDay[indexByDay] = updatedEvent;
      }
    },
    countEventsByStatusForMonth: (
      state,
      action: PayloadAction<{ month: number; year: number }>
    ) => {
      const { month, year } = action.payload;
      const filteredEvents = state.events.filter((event) => {
        const eventDate = new Date(event.start); // Asume que el evento tiene una propiedad 'date'
        return (
          eventDate.getMonth() === month && eventDate.getFullYear() === year
        );
      });

      const countByStatus: EventsByStatus = {};

      for (const key in state.eventState) {
        const statusId = state.eventState[key as keyof EventState];
        countByStatus[key] = filteredEvents.filter(
          (event) => event.status_detail.id === statusId
        ).length;
      }

      state.eventsByStatus = countByStatus;
    },
  },
});
export const countEventsByStatus = (
  events: IEvent[],
  status: number
): number => {
  return events.filter((event) => event.status_detail.id === status).length;
};

export const {
  setEvents,
  clearEvents,
  setEvent,
  setEventsByDay,
  setUpdateEvent,
  countEventsByStatusForMonth,
} = eventSlice.actions;
export default eventSlice.reducer;

export const getCurrentMonthYear = (arg: DatesSetArg) => {
  const currentDate = arg.view.calendar.getDate();
  return {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };
};
