import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
       <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;