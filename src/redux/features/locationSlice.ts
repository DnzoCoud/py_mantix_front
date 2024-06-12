
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
    },
    setUpdateLocation: (state, action: PayloadAction<ILocation>) => {
      const updatedLocation = action.payload;
      const index = state.locations.findIndex(location => location.id === updatedLocation.id);
      if (index !== -1) {
        state.locations[index] = updatedLocation;
      }
    },
  },
});


export const { setLocations, clearLocations, setLocation, setUpdateLocation } = locationSlice.actions;
export default locationSlice.reducer;