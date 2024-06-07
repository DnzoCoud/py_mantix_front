
import { IUser } from "@/interfaces/IUser";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [] as IUser[],
  user: null as IUser | null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
    },
    setUser: (state, action: PayloadAction<IUser>) => {
        state.users.push(action.payload);
    }
  },
});


export const { setUsers, clearUsers, setUser } = userSlice.actions;
export default userSlice.reducer;