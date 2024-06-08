import { IMaquina } from "@/interfaces/IMaquina";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  machines: [] as IMaquina[],
  machine: null as IMaquina | null,
};

export const machineSlice = createSlice({
  name: "machines",
  initialState,
  reducers: {
    setMachines: (state, action: PayloadAction<IMaquina[]>) => {
      state.machines = action.payload;
    },
    clearMachines: (state) => {
      state.machines = [];
    },
    setMachine: (state, action: PayloadAction<IMaquina>) => {
        state.machines.push(action.payload);
    }
  },
});


export const { setMachines, clearMachines, setMachine } = machineSlice.actions;
export default machineSlice.reducer;