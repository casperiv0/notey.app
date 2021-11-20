import { User, UserPreferences } from ".prisma/client";
import create from "zustand";

export const useUser = create<{
  user: User & { preferences?: UserPreferences };
  setUser: (user: User) => void;
}>((set) => ({
  user: { preferences: {} } as User & { preferences?: UserPreferences },
  setUser: (user) => set({ user }),
}));
