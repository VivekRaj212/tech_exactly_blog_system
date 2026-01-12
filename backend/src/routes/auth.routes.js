import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { authLimiter } from "../middleware/rateLimit.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", authLimiter,validate(registerSchema), registerUser);
router.post("/login", authLimiter, validate(loginSchema), loginUser);

export default router;
