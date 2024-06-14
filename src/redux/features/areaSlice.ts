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
    },
    setUpdateArea: (state, action: PayloadAction<IArea>) => {
      const updatedArea = action.payload;
      const index = state.areas.findIndex(area => area.id === updatedArea.id);
      if (index !== -1) {
        state.areas[index] = updatedArea;
      }
    },
    setDeleteArea: (state, action: PayloadAction<number>) => {
      const areaIdToDelete = action.payload;
      const index = state.areas.findIndex((area) => area.id === areaIdToDelete);
      if (index !== -1) {
        state.areas.splice(index, 1); // Elimina el elemento en la posición `index`
      }
    },
  },
});


export const { setAreas, clearAreas, setArea, setUpdateArea, setDeleteArea } = areaSlice.actions;
export default areaSlice.reducer;