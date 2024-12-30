import { User } from "@/types/user";
import { StateCreator } from "zustand";

type AuthState = {
  authUser: null | User;
  token: null | string;
  isAuthenticated: boolean;
};

type ActionState = {
  setCredentials: (authUser: User, token: string) => void;
};

export type AuthSlice = AuthState & ActionState;

const initialState: AuthState = {
  authUser: null,
  token: null,
  isAuthenticated: false,
};

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  setCredentials: (authUser: User, token: string) =>
    set({ authUser, token, isAuthenticated: true }),
});

export default createAuthSlice;
