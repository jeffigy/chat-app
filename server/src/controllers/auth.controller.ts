import { Request, Response } from "express";
import { signUpSchema } from "../schemas/auth.schema";
import User from "../models/user.model";
import { hash } from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  const { error } = signUpSchema.validate(req.body);
  const { email, fullName, password } = req.body;

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

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

  // const refreshToken = sign
  res.json(newUser);
};

export const login = async (req: Request, res: Response) => {
  res.json({ message: "login" });
};

export const logout = async (req: Request, res: Response) => {
  res.json({ message: "logout" });
};
