import { JwtPayload } from "jsonwebtoken";
import { UserType } from "./user";

export type DecodedToken = JwtPayload & {
  UserInfo: UserType;
};
