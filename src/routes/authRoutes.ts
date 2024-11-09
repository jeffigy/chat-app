import { Router } from "express";
import { getMe, login, logout, signup } from "../controllers/authController";
import protectRoute from "../middlewares/protectRoute";

const authRoutes = Router();

authRoutes.get("/me", protectRoute, getMe);
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

export default authRoutes;
