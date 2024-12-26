import { JwtPayload, sign, verify } from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  NODE_ENV,
  REFRESH_TOKEN_SECRET,
} from "../utils/config";
import { Request, Response } from "express";
import { UserType } from "../types/user";

export const generateAccessToken = ({ payload }: { payload: UserType }) => {
  return sign({ UserInfo: payload }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = ({
  payload,
  res,
}: {
  payload: UserType;
  res: Response;
}) => {
  const refreshToken = sign({ UserInfo: payload }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return refreshToken;
};

export const verifyToken = ({
  token,
  req,
  res,
}: {
  token: string;
  req: Request;
  res: Response;
}) => {
  verify(token, ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const payload = decoded as JwtPayload & {
      UserInfo: UserType;
    };

    console.log({ payload });

    if (payload) {
      req.user = payload.UserInfo;
    }
  });
};
