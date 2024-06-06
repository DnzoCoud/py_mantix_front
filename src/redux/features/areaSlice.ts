import { IArea } from "@/interfaces/IArea";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  areas: [] as IArea[],
  area: null as IArea | null,
};

export const areaSlice = createSlice({
  name: "areas",
  initialState,
  reducers: {
    setAreas: (state, action: PayloadAction<IArea[]>) => {
      state.areas = action.payload;
    },
    clearAreas: (state) => {
      state.areas = [];
    },
    setArea: (state, action: PayloadAction<IArea>) => {
        state.areas.push(action.payload);
    }
  },
});


export const { setAreas, clearAreas, setArea } = areaSlice.actions;
export default areaSlice.reducer;