import axios from "axios";

export const getAdminStats = async () => {
  const res = await axios.get("/api/admin/stats", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};