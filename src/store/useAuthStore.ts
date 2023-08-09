import { create } from "zustand";

const testUser = {
  email: "qwer",
  key: "qwer",
  name: "qwer",
  secret: "qwer",
  id: 0,
};
export const useAuthStore = create<{
  user: TUser | null;
  setUser: (user: TUser | null) => void;
}>((set) => ({
  user: testUser,
  setUser: (user: TUser | null) => set({ user }),
}));
