import { create } from "zustand";
import type { IUser } from "../../server/user/user.model";

type StoreUser = IUser & { isAuthenticated: boolean };

type GlobalStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  user: StoreUser;
  setUser: (user: Partial<StoreUser>) => void;
};

export const initialUser: StoreUser = {
  isAuthenticated: false,
  name: "",
  username: "",
  score: 0,
  password: "",
};

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  isLoading: false,
  setIsLoading(isLoading) {
    set({ isLoading });
  },
  user: initialUser,
  setUser(user) {
    set({ user: { ...get().user, ...user } });
  },
}));
