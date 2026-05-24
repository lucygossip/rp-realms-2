import { Routes, Route } from "react-router-dom";
import AdminLayout from "../admin/layout/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;