import { DecodedToken } from "@/types/auth";
import { User } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { StateCreator } from "zustand";

type AuthState = {
  authUser: null | User;
  token: null | string;
  isAuthenticated: boolean;
};

type ActionState = {
  setCredentials: (token: string) => void;
  clearCredentials: () => void;
};

export type AuthSlice = AuthState & ActionState;

const initialState: AuthState = {
  authUser: null,
  token: null,
  isAuthenticated: false,
};

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  setCredentials: (token: string) => {
    const { UserInfo } = jwtDecode<DecodedToken>(token);
    set({
      authUser: UserInfo,
      token,
      isAuthenticated: true,
    });
  },
  clearCredentials: () => set(initialState),
});

export default createAuthSlice;
