import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import CommentList from "../components/CommentList";
import AddComment from "../components/AddComment";
import { useAuth } from "../context/useAuth";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, userName } = useAuth();
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data.posts || res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogout = () => {
    logout(); // clear auth state
    navigate("/login"); // redirect to login
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <div className="d-flex justify-content-between m-3">
        <h2>Posts</h2>
        <div className="d-flex gap-2 PX-3">
          <div className="d-flex align-items-center gap-2">
            <i class="bi bi-person-circle"></i>
            <span className="fw-semibold">Welcome, {userName || "User"}</span>
          </div>
          <Link to="/create-post">
            <button className="btn btn-primary">+ Create Post</button>
          </Link>

          <button
            className="btn btn-outline-danger d-flex align-items-center gap-2 PX-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {posts.length === 0 && <p>No posts found</p>}

      <div className="container my-4 px-3">
        {posts.map((post) => (
          <div key={post._id} className="card mb-4 shadow-sm">
            <div className="card-body">
              {/* Post Title */}
              <h4 className="card-title mb-2">{post.title}</h4>

              {/* Post Content */}
              <p className="card-text text-muted">{post.content}</p>

              {/* Author */}
              <p className="mb-3">
                <small className="text-secondary">
                  Author: {post.author?.name || "Unknown"}
                </small>
              </p>

              <hr />

              {/* Comments */}
              <div className="mb-3">
                <h6 className="fw-bold">Comments</h6>
                <CommentList postId={post._id} />
              </div>

              {/* Add Comment */}
              <div className="mb-3">
                <AddComment postId={post._id} onCommentAdded={fetchPosts} />
              </div>

              {/* Admin Delete */}
              <div className="text-end">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() =>
                    api.delete(`/admin/posts/${post._id}`).then(fetchPosts)
                  }
                >
                  Delete Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
