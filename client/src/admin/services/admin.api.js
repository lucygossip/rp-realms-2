import api from "../../api/axios";

// STATS
export const getAdminStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};

// USERS
export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const banUser = async (userId) => {
  const res = await api.patch(`/admin/users/${userId}/ban`);
  return res.data;
};

export const suspendUser = async (userId) => {
  const res = await api.patch(`/admin/users/${userId}/suspend`);
  return res.data;
};

export const activateUser = async (userId) => {
  const res = await api.patch(`/admin/users/${userId}/activate`);
  return res.data;
};