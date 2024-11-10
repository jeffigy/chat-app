import { Request, Response } from "express";
import prisma from "../db/prisma";

export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const authUserId = req.user.id;

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    });

    res.status(200).json(users);
  } catch (error: any) {
    console.log("error getting users for the sidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

    // find conversation of the 2 users and include messages
    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId],
        },
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    // if theres none, return empty string
    if (!conversation) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.log("error getting messages: ", error.message);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    // check if there is already a conversation between the two users
    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });
    // if theres none, create a new conversation and send the message
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("error sending message: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
