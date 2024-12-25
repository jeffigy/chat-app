import { Router } from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controllers/auth.controller";
import validateToken from "../middlewares/validateToken";

const authRoute = Router();

authRoute.route("/login").post(login);
authRoute.route("/signup").post(signup);
authRoute.route("/logout").post(logout);
authRoute.route("/check").get(validateToken, checkAuth);

export default authRoute;
