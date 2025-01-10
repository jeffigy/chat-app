import { sign, verify } from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  NODE_ENV,
  REFRESH_TOKEN_SECRET,
} from "../utils/config";
import { NextFunction, Request, Response } from "express";
import { UserType } from "../types/user";
import User from "../models/user.model";
import { DecodedToken } from "../types/auth";

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

export const verifyAccessToken = ({
  token,
  req,
  res,
  next,
}: {
  token: string;
  req: Request;
  res: Response;
  next: NextFunction;
}) => {
  verify(token, ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    req.user = (decoded as DecodedToken).UserInfo;

    next();
  });
};

export const verifyRefreshToken = ({
  token,
  res,
}: {
  token: string;
  res: Response;
}) => {
  verify(token, REFRESH_TOKEN_SECRET, async (error, decoded) => {
    if (error) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { UserInfo } = decoded as DecodedToken;

    const foundUser = await User.findOne({ _id: UserInfo.id });

    if (!foundUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const accessToken = generateAccessToken({
      payload: foundUser.toJSON<UserType>(),
    });

    res.json({ accessToken });
  });
};
