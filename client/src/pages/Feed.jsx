import { useEffect, useState } from "react";
import { getPosts } from "../api/post.api";
import { Link } from "react-router-dom";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPosts();
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed-container">

      <div className="feed-header">
        <h2 className="feed-title">Forum Threads</h2>
      </div>

      <div className="thread-list">

        {posts.map((post) => (
          <div key={post._id} className="thread-row">

            {/* LEFT: Main content */}
            <div className="thread-main">

              <Link
                to={`/post/${post._id}`}
                className="thread-title"
              >
                {post.title}
              </Link>

              <div className="thread-meta">
                Posted by{" "}
                <span className="thread-author">
                  {post.author?.username || "Unknown"}
                </span>
              </div>

            </div>

            {/* RIGHT: Stats */}
            <div className="thread-stats">

              <div className="thread-replies">
                {post.replyCount || 0} replies
              </div>

              <div className="thread-date">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Feed;