import Comment from "../models/comment.model.js";
import { getPagination } from "../utils/pagination.js";

/* CREATE COMMENT */
export const createComment = async (req, res) => {
  const { content, postId } = req.body;

  const comment = await Comment.create({
    content,
    post: postId,
    author: req.user.userId,
  });

  res.status(201).json({
    message: "Comment added",
    comment,
  });
};

/* GET COMMENTS BY POST */
export const getCommentsByPost = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const total = await Comment.countDocuments({
    post: req.params.postId,
    isDeleted: false,
  });
  const comments = await Comment.find({
    post: req.params.postId,
    isDeleted: false,
  })
    .populate("author", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

   res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    comments,
  });
};

/* UPDATE COMMENT */
export const updateComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment || comment.isDeleted) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (
    req.user.role !== "ADMIN" &&
    comment.author.toString() !== req.user.userId
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

  comment.content = req.body.content || comment.content;
  await comment.save();

  res.json({ message: "Comment updated", comment });
};

/* DELETE COMMENT (SOFT DELETE) */
export const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment || comment.isDeleted) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (
    req.user.role !== "ADMIN" &&
    comment.author.toString() !== req.user.userId
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

  comment.isDeleted = true;
  await comment.save();

  res.json({ message: "Comment deleted" });
};
