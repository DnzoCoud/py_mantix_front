import { IAuth } from "@/interfaces/auth/IAuth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: null as IAuth | null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<IAuth>) => {
      state.authUser = action.payload;
    },
    clearAuthUser: (state) => {
      state.authUser = null;
    },
  },
});

export const { setAuthUser, clearAuthUser } = authSlice.actions;

export default authSlice.reducer;
