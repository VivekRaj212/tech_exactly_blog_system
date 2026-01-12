import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createPostSchema,
  updatePostSchema,
} from "../validators/post.validator.js";

const router = express.Router();

/* Public */
router.get("/", getAllPosts);
router.get("/:id", getPostById);

/* Protected */
router.post("/", authenticateUser, validate(createPostSchema), createPost);
router.put("/:id", authenticateUser, validate(updatePostSchema), updatePost);
router.delete("/:id", authenticateUser, deletePost);

export default router;
