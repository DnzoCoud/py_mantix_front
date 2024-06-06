
import { ILocation } from "@/interfaces/ILocation";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [] as ILocation[],
  location: null as ILocation | null,
};

export const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<ILocation[]>) => {
      state.locations = action.payload;
    },
    clearLocations: (state) => {
      state.locations = [];
    },
    setLocation: (state, action: PayloadAction<ILocation>) => {
        state.locations.push(action.payload);
    }
  },
});


export const { setLocations, clearLocations, setLocation } = locationSlice.actions;
export default locationSlice.reducer;