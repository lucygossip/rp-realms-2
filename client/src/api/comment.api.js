import api from "./axios";

export const getComments = (postId) =>
  api.get(`/comments/${postId}`);

export const createComment = (postId, data) =>
  api.post(`/comments/${postId}`, data);

export const deleteComment = (id) =>
  api.delete(`/comments/${id}`);