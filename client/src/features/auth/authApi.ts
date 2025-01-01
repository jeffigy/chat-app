import axiosInstance from "@/lib/axiosInstance";
import { LoginCredentials, SignupCredentials } from "@/types/auth";

const BASE_URL = "/api/auth";

export const login = async (credentials: LoginCredentials) => {
  return (await axiosInstance.post(`${BASE_URL}/login`, credentials)).data;
};

export const signup = async (credentials: SignupCredentials) => {
  return (await axiosInstance.post(`${BASE_URL}/signup`, credentials)).data;
};