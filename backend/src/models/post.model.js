import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre("save", function () {
  if (!this.isModified("title")) return;

  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
});

const Post = mongoose.model("Post", postSchema);
export default Post;


