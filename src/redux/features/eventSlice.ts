import { IArea } from "@/interfaces/IArea";
import { IEvent } from "@/interfaces/IEvent";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface EventState{
  PROGRAMADO:number
  EN_EJECUCION:number
  COMPLETADO:number
  REPROGRAMADO:number
  PETICION_REPROGRAMADO:number
}

const initialState = {
  events: [] as IEvent[],
  event: null as IEvent | null,
  eventsByDay: [] as IEvent[] | [],
  eventState:{
    PROGRAMADO:1,
    EN_EJECUCION:2,
    COMPLETADO:3,
    REPROGRAMADO:4,
    PETICION_REPROGRAMADO:5
  } as EventState
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
      state.eventsByDay = action.payload
    }
  },
});


export const { setEvents, clearEvents, setEvent, setEventsByDay } = eventSlice.actions;
export default eventSlice.reducer;