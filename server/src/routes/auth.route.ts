import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { asyncHandler } from "../middlewares/checkAuth";

const router = Router();

router.post("/login", asyncHandler(authController.login));

router.post("/register", asyncHandler(authController.register));

router.get("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout);

export default router;

