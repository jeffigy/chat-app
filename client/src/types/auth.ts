import { User } from "./user";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupCredentials = LoginCredentials & {
  fullName: string;
};

export type DecodedToken = {
  UserInfo: User;
  exp: number;
  iat: number;
};
