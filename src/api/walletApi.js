import API from "./axios";

export const getWallet = () => API.get("/wallet/");
export const topUpWallet = (data) => API.post("/wallet/topup/", data);
export const withdrawWallet = (data) =>
  API.post("/wallet/withdraw/", data);
export const getTransactions = () =>
  API.get("/wallet/transactions/");