import { create } from "zustand";

export const useAuthStore = create<{
  user: TUser | null;
  setUser: (user: TUser | null) => void;
}>((set) => ({
  user: null,
  setUser: (user: TUser | null) => set({ user }),
}));
