import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostsByCategory } from "../api/post.api";
import "../styles/components/categoryThreads.css";

const CategoryThreads = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPostsByCategory(category);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return <div className="threads-loading">Loading threads...</div>;
  }

  return (
    <div className="threads-page">
      <div className="threads-container">

        {/* Header */}
        <div className="threads-header">
          <div>
            <h2 className="threads-title">
              {category.replace("-", " ")}
            </h2>
            <p className="threads-subtitle">
              Browse discussions in this category
            </p>
          </div>

          <Link to="/create-post" className="new-thread-btn">
            + New Thread
          </Link>
        </div>

        {/* Table */}
        <div className="threads-table">

          {/* Table Head */}
          <div className="threads-table-head">
            <div>Thread</div>
            <div>Author</div>
            <div>Date</div>
          </div>

          {/* Table Body */}
          <div className="threads-table-body">
            {posts.length === 0 ? (
              <div className="empty-state">
                No threads yet in this category.
              </div>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="thread-row">

                  {/* Thread */}
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

                  {/* Author */}
                  <div className="thread-author">
                    {post.author?.username || "Unknown"}
                  </div>

                  {/* Date */}
                  <div className="thread-date">
                    {formatDate(post.createdAt)}
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryThreads;