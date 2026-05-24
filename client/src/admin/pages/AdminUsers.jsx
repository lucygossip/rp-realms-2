import { useEffect, useState } from "react";
import {
  getAllUsers,
  banUser,
  suspendUser,
  activateUser,
  updateUserRole,
} from "../services/admin.api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // track which button is loading per user
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId, actionFn, actionKey) => {
    setActionLoading((prev) => ({
      ...prev,
      [userId]: actionKey,
    }));

    try {
      await actionFn(userId);

      // refresh users after action
      await fetchUsers();
    } catch (err) {
      console.error("Action failed:", err);
      alert("Action failed. Please try again.");
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [userId]: null,
      }));
    }
  };

  if (loading) {
    return <p className="admin-loading">Loading users...</p>;
  }

  return (
    <div>
      <h1 className="admin-title">Users</h1>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const loadingAction = actionLoading[user._id];

              return (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>

                  <td>
                    <span className={`status ${user.status}`}>
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <select
                      value={user.role}
                      disabled={!!loadingAction}
                      onChange={(e) =>
                        handleAction(
                          user._id,
                          (id) => updateUserRole(id, e.target.value),
                          "role",
                        )
                      }
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>

                    {loadingAction === "role" && <span>...</span>}
                  </td>

                  <td className="actions">
                    {/* ACTIVATE */}
                    <button
                      disabled={!!loadingAction}
                      onClick={() =>
                        handleAction(user._id, activateUser, "activate")
                      }
                    >
                      {loadingAction === "activate" ? "..." : "Activate"}
                    </button>

                    {/* SUSPEND */}
                    <button
                      disabled={!!loadingAction}
                      onClick={() =>
                        handleAction(user._id, suspendUser, "suspend")
                      }
                    >
                      {loadingAction === "suspend" ? "..." : "Suspend"}
                    </button>

                    {/* BAN */}
                    <button
                      className="danger"
                      disabled={!!loadingAction}
                      onClick={() => handleAction(user._id, banUser, "ban")}
                    >
                      {loadingAction === "ban" ? "..." : "Ban"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
