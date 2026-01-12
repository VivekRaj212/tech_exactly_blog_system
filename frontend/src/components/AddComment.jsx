import { useState } from "react";
import api from "../api/axios";

const AddComment = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/comments", {
        postId,
        content,
      });

      setContent("");
      onCommentAdded();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add comment");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Comment</button>
    </form>
  );
};

export default AddComment;
