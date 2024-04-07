import { create } from "zustand";

export type Theme = "light" | "dark" | "auto";
interface IThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
const useThemeStore = create<IThemeState>((set) => {
  // Determina el tema preferido del usuario
  const isDarkThemePreferred = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // Establece el tema inicial basado en el tema preferido del sistema
  const initialTheme: Theme = isDarkThemePreferred ? "dark" : "light";
  set({ theme: initialTheme });

  return {
    theme: initialTheme,
    setTheme: (theme) => {
      set({ theme });
      toggleBodyClass(theme);
    },
  };
});

const toggleBodyClass = (theme: Theme) => {
  const body = document.body;
  if (body) {
    body.classList.remove("light", "dark");
    if (theme !== "auto") {
      body.classList.add(theme);
    }
  }
};

export default useThemeStore;
