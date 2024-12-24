import { JwtPayload, sign, verify } from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  NODE_ENV,
  REFRESH_TOKEN_SECRET,
} from "../utils/config";
import { Request, Response } from "express";

export const generateAccessToken = ({ payload }: { payload: string }) => {
  return sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = ({
  payload,
  res,
}: {
  payload: string;
  res: Response;
}) => {
  const refreshToken = sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

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
      userId: string;
    };

    console.log({ payload });

    if (payload) {
      req.userId = payload.userId;
    }
  });
};
