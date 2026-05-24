import { Routes, Route } from "react-router-dom";
import AdminLayout from "../admin/layout/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import AdminUsers from "../admin/pages/AdminUsers";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;