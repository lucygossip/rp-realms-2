import api from "./axios";

export const register = (data) => {
  return api.post("/auth/register", data);
};

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const getMe = () => {
  return api.get("/auth/me");
};