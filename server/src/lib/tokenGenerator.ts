import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../utils/config";
import { Response } from "express";

type TokenPayload = {
  userId: string;
};

export const generateAccessToken = (payload: TokenPayload) => {
  return sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: TokenPayload, res: Response) => {
  const refreshToken = sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};
