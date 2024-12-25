import { Request, Response } from "express";
import {
  logInSchema,
  logOutSchema,
  signUpSchema,
} from "../schemas/auth.schema";
import User from "../models/user.model";
import { compare, hash } from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../lib/tokenGenerator";
import { NODE_ENV } from "../utils/config";

export const signup = async (req: Request, res: Response) => {
  const { error } = signUpSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const { email, fullName, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email already exist" });
    return;
  }

  const hashedPwd = await hash(password, 10);

  const newUser = await User.create({
    fullName,
    email,
    password: hashedPwd,
  });

  generateRefreshToken({ payload: newUser._id.toString(), res });
  const accessToken = generateAccessToken({ payload: newUser._id.toString() });
  res.status(201).json({ accessToken });
};

export const login = async (req: Request, res: Response) => {
  const { error } = logInSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const { email, password } = req.body;

  const foundUser = await User.findOne({ email });
  console.log(foundUser);

  if (!foundUser) {
    res.status(401).json({ message: "Incorrect email or password" });
    return;
  }

  const matchPwd = await compare(password, foundUser.password);

  if (!matchPwd) {
    res.status(401).json({ message: "Incorrect email or password" });
    return;
  }

  generateRefreshToken({ payload: foundUser._id.toString(), res });
  const accessToken = generateAccessToken({
    payload: foundUser._id.toString(),
  });

  res.json({ accessToken });
};

export const logout = async (req: Request, res: Response) => {
  const { error } = logOutSchema.validate(req.cookies);

  if (error) {
    res.status(400).json({ message: "No token provided" });
    return;
  }
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: NODE_ENV !== "development",
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
};

export const checkAuth = (req: Request, res: Response) => {
  res.status(200).json(req.userId);
};
