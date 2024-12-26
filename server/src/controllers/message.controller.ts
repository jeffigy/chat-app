import { Request, Response } from "express";
import User from "../models/user.model";
import Message from "../models/message.model";
import cloudinary from "../lib/cloudinary";

export const getChatList = async (req: Request, res: Response) => {
  const { id } = req.user;

  const getChatList = await User.find({ _id: { $ne: id } });

  res.status(200).json(getChatList);
};

export const getMessages = async (req: Request, res: Response) => {
  const { id: userChatId } = req.params;
  const { id: authUserId } = req.user;

  const messages = await Message.find({
    $or: [
      { senderId: authUserId, receiverId: userChatId },
      { senderId: userChatId, receiverId: authUserId },
    ],
  });
  res.status(200).json(messages);
};

export const sendMessage = async (req: Request, res: Response) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const { id: senderId } = req.user;

  let imageUrl;
  if (image) {
    const { secure_url } = await cloudinary.uploader.upload(image);
    imageUrl = secure_url;
  }

  await Message.create({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  res.status(201).json({ message: "Message sent" });
};
