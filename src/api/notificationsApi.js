import API from "./axios";

export const getNotifications = () =>
  API.get("/notifications/");

export const markAsRead = (id) =>
  API.put(`/notifications/${id}/read/`);

export const clearNotifications = () =>
  API.delete("/notifications/clear/");