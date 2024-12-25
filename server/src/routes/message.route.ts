import { Router } from "express";
import validateToken from "../middlewares/validateToken";
import {
  getChatList,
  getMessages,
  sendMessage,
} from "../controllers/message.controller";

const messageRoute = Router();

messageRoute.use(validateToken);

messageRoute.route("/").get(getChatList);
messageRoute.route("/:id").get(getMessages).post(sendMessage);

export default messageRoute;
