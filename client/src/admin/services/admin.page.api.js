import axios from "../../api/axios";

export const updatePage = async (slug, data) => {
  const res = await axios.put(`/api/admin/pages/${slug}`, data);
  return res.data;
};