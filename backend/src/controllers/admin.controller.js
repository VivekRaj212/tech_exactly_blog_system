import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { getPagination } from "../utils/pagination.js";

export const getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalPosts = await Post.countDocuments({ isDeleted: false });
  const totalComments = await Comment.countDocuments({ isDeleted: false });

  res.json({
    totalUsers,
    totalPosts,
    totalComments,
  });
};

export const getAllUsers = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const total = await User.countDocuments();
  const users = await User.find().select("-password").skip(skip).limit(limit);
  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    users,
  });
};

export const adminDeletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.isDeleted) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.isDeleted = true;
  await post.save();

  res.json({ message: "Post deleted by admin" });
};

export const adminDeleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment || comment.isDeleted) {
    return res.status(404).json({ message: "Comment not found" });
  }

  comment.isDeleted = true;
  await comment.save();

  res.json({ message: "Comment deleted by admin" });
};
