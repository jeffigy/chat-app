import { Request, Response } from "express";
import cloudinary from "../lib/cloudinary";
import User from "../models/user.model";

export const updateProfile = async (req: Request, res: Response) => {
  const { profilePic } = req.body;
  const { id } = req.user;

  if (!profilePic) {
    res.status(400).json({ message: "Profile pic is required" });
    return;
  }

  const { secure_url } = await cloudinary.uploader.upload(profilePic);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      profilePic: secure_url,
    },
    { new: true }
  );

  res.json(updatedUser);
};
