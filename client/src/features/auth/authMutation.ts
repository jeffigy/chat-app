import { useMutation } from "@tanstack/react-query";
import { login, signup } from "./authApi";
import { LoginCredentials, SignupCredentials } from "@/types/auth";

export function useLoginMutation() {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    mutationKey: ["login"],
  });
}

export function useSignupMutation() {
  return useMutation({
    mutationFn: (credentials: SignupCredentials) => signup(credentials),
    mutationKey: ["signup"],
  });
}
