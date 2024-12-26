import { User } from "@/types/user";
import { StateCreator } from "zustand";

type AuthState = {
  authUser: null | User;
};

type ActionState = {
  setAuthUser: (authUser: User) => void;
};

export type AuthSlice = AuthState & ActionState;

const initialState: AuthState = {
  authUser: null,
};

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  setAuthUser: (authUser: User) => set({ authUser }),
});

export default createAuthSlice;
