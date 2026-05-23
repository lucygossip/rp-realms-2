import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../api/post.api";
import { getComments, createComment, deleteComment } from "../api/comment.api";
import { jwtDecode } from "jwt-decode";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  let user = null;

  if (token) {
    try {
      user = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await getPost(id);
        setPost(postRes.data);

        const commentRes = await getComments(id);
        setComments(commentRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      await createComment(id, { content });

      const commentRes = await getComments(id);
      setComments(commentRes.data);

      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Delete this thread?")) return;

    try {
      await deletePost(id);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await deleteComment(commentId);

      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) {
    return <div className="post-loading">Loading...</div>;
  }

  return (
    <div className="post-page">
      {/* THREAD */}
      <div className="post-container">
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <img
              src={
                post.author?.avatar ||
                "https://ui-avatars.com/api/?background=random"
              }
              className="post-avatar"
              alt={post.author?.username}
            />

            <div>
              <div className="post-author">{post.author?.username}</div>

              <div className="post-date">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="post-content">{post.content}</div>

        {/* ADMIN DELETE POST */}
        {isAdmin && (
          <button className="delete-btn danger" onClick={handleDeletePost}>
            Delete Thread
          </button>
        )}
      </div>

      {/* COMMENTS */}
      <div className="comments-section">
        <h2>Replies ({comments.length})</h2>

        <form onSubmit={handleComment} className="comment-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a reply..."
            rows="4"
            className="comment-input"
          />

          <button type="submit" className="reply-btn">
            Post Reply
          </button>
        </form>

        <div className="comments-list">
          {comments.map((c) => (
            <div key={c._id} className="comment">
              <img
                src={
                  c.author?.avatar ||
                  "https://ui-avatars.com/api/?background=random"
                }
                className="comment-avatar"
                alt={c.author?.username}
              />

              <div className="comment-body">
                <div className="comment-header">
                  <span className="comment-user">{c.author?.username}</span>

                  <span className="comment-date">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="comment-content">{c.content}</p>

                {/* ADMIN DELETE COMMENT */}
                {isAdmin && (
                  <button
                    className="delete-btn small danger"
                    onClick={() => handleDeleteComment(c._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
