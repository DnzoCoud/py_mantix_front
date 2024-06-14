
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
    },
    setUpdateUser: (state, action: PayloadAction<IUser>) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    setDeleteUser: (state, action: PayloadAction<number>) => {
      const UserId = action.payload;
      const index = state.users.findIndex((user) => user.id === UserId);
      if (index !== -1) {
        state.users.splice(index, 1); // Elimina el elemento en la posición `index`
      }
    },
  },
});


export const { setUsers, clearUsers, setUser, setUpdateUser, setDeleteUser } = userSlice.actions;
export default userSlice.reducer;