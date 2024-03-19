import { IThemeState } from "@/interfaces/IThemeState";
import { create } from "zustand";

const useThemeStore = create<IThemeState>((set) => ({
  darkMode:
    typeof window !== "undefined"
      ? localStorage.getItem("darkMode") === "true"
      : false,
  toggleTheme: () => set((state: any) => ({ darkMode: !state.darkMode })),
}));

export default useThemeStore;
