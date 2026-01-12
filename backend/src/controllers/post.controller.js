import Post from "../models/post.model.js";
import { getPagination } from "../utils/pagination.js";

/* CREATE POST */
export const createPost = async (req, res) => {
  const { title, content } = req.body;

  const post = await Post.create({
    title,
    content,
    author: req.user.userId,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
};

/* GET ALL POSTS (non-deleted) */
export const getAllPosts = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const total = await Post.countDocuments({ isDeleted: false });
  const posts = await Post.find({ isDeleted: false })
    .populate("author", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({ page, limit, total, totalPages: Math.ceil(total / limit), posts });
};

/* GET SINGLE POST */
export const getPostById = async (req, res) => {
  const post = await Post.findOne({
    _id: req.params.id,
    isDeleted: false,
  }).populate("author", "name email");

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
};

/* UPDATE POST */
export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.isDeleted) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Ownership or ADMIN check
  if (req.user.role !== "ADMIN" && post.author.toString() !== req.user.userId) {
    return res.status(403).json({ message: "Not allowed" });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  await post.save();

  res.json({ message: "Post updated successfully", post });
};

/* DELETE POST (SOFT DELETE) */
export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.isDeleted) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (req.user.role !== "ADMIN" && post.author.toString() !== req.user.userId) {
    return res.status(403).json({ message: "Not allowed" });
  }

  post.isDeleted = true;
  await post.save();

  res.json({ message: "Post deleted successfully" });
};
