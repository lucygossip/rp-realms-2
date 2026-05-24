import { jwtDecode } from "jwt-decode";

export const useAdminAuth = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  const user = jwtDecode(token);

  return user.role === "admin" || user.role === "moderator";
};