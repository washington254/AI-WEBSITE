import { create } from "zustand";

export const useStore = create((set) => ({
  theme: "dark",
  toggleTheme: (newTheme) => set(() => ({
    theme: newTheme
  }))
}));