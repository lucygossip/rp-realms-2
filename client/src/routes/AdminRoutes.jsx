import { Routes, Route } from "react-router-dom";
import AdminLayout from "../admin/layout/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import AdminUsers from "../admin/pages/AdminUsers";
import EditPage from "../admin/pages/EditPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="/pages/rules" element={<EditPage slug="rules" />} />
<Route path="/pages/guidelines" element={<EditPage slug="guidelines" />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;