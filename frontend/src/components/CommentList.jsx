import { useEffect, useState } from "react";
import api from "../api/axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/post/${postId}`);
      setComments(res.data.comments || res.data);
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="mt-3">
      {comments.length === 0 && (
        <p className="text-muted mb-2">No comments yet</p>
      )}

      {comments.length > 0 && (
        <ul className="list-group list-group-flush">
          {comments.map((comment) => (
            <li key={comment._id} className="list-group-item px-0">
              <div className="d-flex justify-content-between align-items-start">
                {/* Comment Content */}
                <div>
                  <p className="mb-1">{comment.content}</p>
                  <small className="text-primary fw-semibold">
                    By: {comment.author?.name || "User"}
                  </small>
                </div>

                {/* Delete Button */}
                <button
                  className="btn btn-sm btn-outline-danger ms-3 px-3"
                  onClick={() =>
                    api
                      .delete(`/admin/comments/${comment._id}`)
                      .then(fetchComments)
                  }
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
