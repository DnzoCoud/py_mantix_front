import { IArea } from "@/interfaces/IArea";
import { IEvent } from "@/interfaces/IEvent";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [] as IEvent[],
  event: null as IEvent | null,
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
    }
  },
});


export const { setEvents, clearEvents, setEvent } = eventSlice.actions;
export default eventSlice.reducer;