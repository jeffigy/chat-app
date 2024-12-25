import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import messageRoute from "./message.route";

const apiRoute = Router();

apiRoute.use("/auth", authRoute);
apiRoute.use("/user", userRoute);
apiRoute.use("/messages", messageRoute);

export default apiRoute;
