import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "blue" | "green";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => {
        if (typeof window !== "undefined") {
          const root = window.document.documentElement;
          root.classList.remove("light", "dark", "blue", "green");
          root.classList.add(theme);
        }
        set({ theme });
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== "undefined") {
          const root = window.document.documentElement;
          root.classList.remove("light", "dark", "blue", "green");
          root.classList.add(state.theme);
        }
      },
    }
  )
);
