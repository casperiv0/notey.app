import { User } from ".prisma/client";
import create from "zustand";

export const useUser = create<{ user: User; setUser: (user: User) => void }>((set) => ({
  user: null as unknown as User,
  setUser: (user) => set({ user }),
}));
