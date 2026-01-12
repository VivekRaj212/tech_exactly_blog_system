import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

import { validate } from "../middleware/validate.middleware.js";
import {
  createCommentSchema,
  updateCommentSchema,
} from "../validators/comment.validator.js";

const router = express.Router();

/* Public */
router.get("/post/:postId", getCommentsByPost);

/* Protected */
router.post("/", authenticateUser,validate(createCommentSchema), createComment);
router.put("/:id", authenticateUser,validate(updateCommentSchema), updateComment);
router.delete("/:id", authenticateUser, deleteComment);

export default router;
