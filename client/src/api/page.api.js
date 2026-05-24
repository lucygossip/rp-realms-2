import axios from "./axios"; // or wherever your axios instance is

export const getPage = async (slug) => {
  const res = await axios.get(`/pages/${slug}`);
  return res.data;
};