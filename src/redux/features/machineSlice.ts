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
    },
    setUpdateMachine: (state, action: PayloadAction<IMaquina>) => {
      const updatedMachine = action.payload;
      const index = state.machines.findIndex(machine => machine.id === updatedMachine.id);
      if (index !== -1) {
        state.machines[index] = updatedMachine;
      }
    },
  },
});


export const { setMachines, clearMachines, setMachine, setUpdateMachine } = machineSlice.actions;
export default machineSlice.reducer;