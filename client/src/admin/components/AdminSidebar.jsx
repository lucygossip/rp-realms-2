import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-title">
        Admin Panel
      </div>

      <nav className="admin-nav">
        <NavLink to="/admin" end className="admin-link">
          Dashboard
        </NavLink>

        <NavLink to="/admin/users" className="admin-link">
  Users
</NavLink>

        <NavLink to="/admin/posts" className="admin-link">
          Posts
        </NavLink>

        <NavLink to="/admin/reports" className="admin-link">
          Reports
        </NavLink>

        <NavLink to="/admin/settings" className="admin-link">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;