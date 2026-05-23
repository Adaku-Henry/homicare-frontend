import API from "./axios";

export const getPlans = () => API.get("/subscriptions/plans/");
export const subscribe = (data) =>
  API.post("/subscriptions/subscribe/", data);

export const getMySubscription = () =>
  API.get("/subscriptions/me/");