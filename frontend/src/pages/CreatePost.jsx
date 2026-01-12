import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/posts", { title, content });
      alert("Post created successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="mb-4 text-center">Create Post</h2>

          <form
            className="border rounded-3 p-4 shadow-sm bg-white"
            onSubmit={handleSubmit}
          >
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content */}
            <div className="mb-4">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Submit */}
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
