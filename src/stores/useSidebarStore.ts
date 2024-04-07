import { create } from "zustand";

interface ISideBarState {
  isOpen: boolean;
  handleOpen: () => void;
}
const useSidebarStore = create<ISideBarState>((set) => ({
  isOpen: true,
  handleOpen: () => {
    set((prevState) => ({ isOpen: !prevState.isOpen }));
  },
}));

export default useSidebarStore;
