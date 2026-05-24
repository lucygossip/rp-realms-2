import { useEffect, useState } from "react";
import { getAdminStats } from "../services/admin.api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getAdminStats();
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="admin-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Users</h3>
          <p>{stats?.users ?? 0}</p>
        </div>

        <div className="stat-card">
          <h3>Posts</h3>
          <p>{stats?.posts ?? 0}</p>
        </div>

        <div className="stat-card danger">
          <h3>Banned</h3>
          <p>{stats?.bannedUsers ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;