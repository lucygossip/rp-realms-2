import { useEffect, useState } from "react";
import { getAdminStats } from "../services/admin.api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load admin stats"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-page">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <h2 style={{ color: "red" }}>{error}</h2>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Users</h3>
          <p>{stats?.users ?? 0}</p>
        </div>

        <div className="stat-card">
          <h3>Posts</h3>
          <p>{stats?.posts ?? 0}</p>
        </div>

        <div className="stat-card">
          <h3>Banned Users</h3>
          <p>{stats?.bannedUsers ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;