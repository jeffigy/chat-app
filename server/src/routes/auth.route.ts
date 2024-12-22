import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller";

const authRoute = Router();

authRoute.route("/login").post(login);
authRoute.route("/signup").post(signup);
authRoute.route("/logout").post(logout);

export default authRoute;
