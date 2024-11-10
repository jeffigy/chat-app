import { Router } from "express";
import protectRoute from "../middlewares/protectRoute";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/messageController";
const messageRoutes = Router();

messageRoutes.get("/conversations", protectRoute, getUsersForSidebar);
messageRoutes.get("/:id", protectRoute, getMessages),
  messageRoutes.post("/send/:id", protectRoute, sendMessage);

export default messageRoutes;
