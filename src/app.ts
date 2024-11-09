import express, { Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoute";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

export default app;
