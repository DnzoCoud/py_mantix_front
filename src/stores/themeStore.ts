import { create } from "zustand";

export type Theme = "light" | "dark";
interface IThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
const useThemeStore = create<IThemeState>((set) => {
  // Establece el tema inicial como "light"
  const initialTheme: Theme = "light";
  set({ theme: initialTheme });

  return {
    theme: initialTheme,
    setTheme: (theme) => {
      if (theme === "dark" || theme === "light") {
        // Verifica si el tema es válido
        set({ theme });
        toggleBodyClass(theme);
      }
    },
  };
});

const toggleBodyClass = (theme: Theme) => {
  const body = document.body;
  if (body) {
    body.classList.remove("light", "dark");
    body.classList.add(theme);
  }
};

export default useThemeStore;
