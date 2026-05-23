import API from "./axios";

export const initiatePayment = (data) =>
  API.post("/payments/initiate/", data);

export const verifyPayment = (data) =>
  API.post("/payments/verify/", data);

export const getPaymentHistory = () =>
  API.get("/payments/history/");