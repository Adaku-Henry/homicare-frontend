import API from "./axios";

export const getMessages = (bookingId) =>
  API.get(`/communications/${bookingId}/`);

export const sendMessage = (data) =>
  API.post("/communications/send/", data);