const ProfileOverview = ({ user }) => {
  return (
    <div className="profile-overview">

      <div className="profile-fields">

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

export default ProfileOverview;