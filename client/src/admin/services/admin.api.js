import api from "../../api/axios";

// ========================
// Admin Stats
// ========================
export const getAdminStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};

// ========================
// Users
// ========================
export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

// ========================
// Posts
// ========================
export const getAllPosts = async () => {
  const res = await api.get("/admin/posts");
  return res.data;
};