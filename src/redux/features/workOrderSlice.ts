import { IArea } from "@/interfaces/IArea";
import { IWorkOrder } from "@/interfaces/IWorkOrder";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  workOrders: [] as IWorkOrder[],
  workOrder: null as IWorkOrder | null,
};

export const workOrderSlice = createSlice({
  name: "workOrders",
  initialState,
  reducers: {
    setWorkOrders: (state, action: PayloadAction<IWorkOrder[]>) => {
      state.workOrders = action.payload;
    },
    clearWorkOrders: (state) => {
      state.workOrders = [];
    },
    setWorkOrder: (state, action: PayloadAction<IWorkOrder>) => {
        state.workOrders.push(action.payload);
    },
    setUpdateWorkOrder: (state, action: PayloadAction<IWorkOrder>) => {
      const updatedWorkOrder = action.payload;
      const index = state.workOrders.findIndex(workOrder => workOrder.id === updatedWorkOrder.id);
      if (index !== -1) {
        state.workOrders[index] = updatedWorkOrder;
      }
    },
  },
});


export const { setWorkOrders, clearWorkOrders, setWorkOrder, setUpdateWorkOrder } = workOrderSlice.actions;
export default workOrderSlice.reducer;