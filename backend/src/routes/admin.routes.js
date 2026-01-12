import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  getDashboardStats,
  getAllUsers,
  adminDeletePost,
  adminDeleteComment,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  authenticateUser,
  authorizeRoles("ADMIN"),
  getDashboardStats
);

router.get("/users", authenticateUser, authorizeRoles("ADMIN"), getAllUsers);

router.delete(
  "/posts/:id",
  authenticateUser,
  authorizeRoles("ADMIN"),
  adminDeletePost
);

router.delete(
  "/comments/:id",
  authenticateUser,
  authorizeRoles("ADMIN"),
  adminDeleteComment
);

export default router;
