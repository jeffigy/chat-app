import { Router } from "express";
import validateToken from "../middlewares/validateToken";
import { updateProfile } from "../controllers/user.controller";

const userRoute = Router();

userRoute.use(validateToken);

userRoute.route("/update-profile").put(updateProfile);

export default userRoute;
