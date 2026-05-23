import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user found</div>;

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);

      await api.put("/auth/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-header">

          <img
            src={user.avatar}
            alt="avatar"
            className="profile-avatar"
          />

          <label className="upload-btn">
            Change Avatar
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarUpload}
            />
          </label>

          {uploading && <p>Uploading...</p>}

          <h1>{user.username}</h1>

        </div>


        <div className="field">
          <label>Username</label>
          <input value={user.username} disabled />
        </div>

        <div className="field">
          <label>Email</label>
          <input value={user.email} disabled />
        </div>

      </div>
    </div>
  );
};

export default Profile;