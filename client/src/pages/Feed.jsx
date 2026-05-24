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
  <div className="threads-page">
    <div className="threads-container">

      <div className="threads-header">
        <div>
          <h2 className="threads-title">Forum Threads</h2>
          <p className="threads-subtitle">
            Browse all discussions
          </p>
        </div>

        <Link to="/create-post" className="new-thread-btn">
          + New Thread
        </Link>
      </div>

      <div className="threads-table">

        <div className="threads-table-head">
          <div>Thread</div>
          <div>Author</div>
          <div>Date</div>
        </div>

        <div className="threads-table-body">

          {posts.map((post) => (
            <div key={post._id} className="thread-row">

              <div className="thread-main">
                <Link
                  to={`/post/${post._id}`}
                  className="thread-title-link"
                >
                  {post.title}
                </Link>

                <div className="thread-preview">
                  {post.content.slice(0, 80)}...
                </div>
              </div>

              <div className="thread-author">
                {post.author?.username || "Unknown"}
              </div>

              <div className="thread-date">
                {new Date(post.createdAt).toLocaleDateString("en-GB")}
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  </div>
);
};

export default Feed;