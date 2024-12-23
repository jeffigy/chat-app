import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";

const apiRoute = Router();

apiRoute.use("/auth", authRoute);
apiRoute.use("/user", userRoute);

export default apiRoute;
