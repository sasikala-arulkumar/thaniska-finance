import express from "express";
import { changePassword, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/change-password", authMiddleware, changePassword);

export default router;
