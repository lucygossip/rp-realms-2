import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="profile-status">Loading...</div>;
  if (!user) return <div className="profile-status">No user found</div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar" />

          <h1 className="profile-name">{user.username}</h1>
        </div>

        {/* Fields */}
        <div className="profile-fields">
          <div className="field">
            <label>Username</label>
            <input type="text" value={user.username} disabled />
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" value={user.email} disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;