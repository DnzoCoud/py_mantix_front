import { create } from "zustand";

interface IDataOption {
  dataOption: number;
  handleChangeDataOption: (option: number) => void;
}
export const useUserStore = create<IDataOption>((set) => ({
  dataOption: 1,
  handleChangeDataOption: (option: number) => {
    set({
      dataOption: option,
    });
  },
}));
