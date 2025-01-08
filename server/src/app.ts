import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./lib/connectDb";
import errorHandler from "./middlewares/errorHandler";
import apiRoute from "./routes";
import cors from "cors";
import corsOption from "./utils/corsOption";
import { json, urlencoded } from "body-parser";

connectDB();

const app = express();

app.use(cors(corsOption));
app.use(json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRoute);

app.use(errorHandler);

export default app;
