import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./lib/connectDb";
import errorHandler from "./middlewares/errorHandler";
import apiRoute from "./routes";

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRoute);

app.use(errorHandler);

export default app;
