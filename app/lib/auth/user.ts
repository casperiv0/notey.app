import { User, UserPreferences } from ".prisma/client";
import create from "zustand";

interface UserStore {
  user: User & { preferences?: UserPreferences };
  setUser(user: User): void;
}

export const useUser = create<UserStore>()((set) => ({
  user: { preferences: {} } as User & { preferences?: UserPreferences },
  setUser: (user) => set({ user }),
}));
