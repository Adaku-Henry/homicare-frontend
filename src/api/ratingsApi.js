import API from "./axios";

export const getRatings = () => API.get("/ratings/");
export const addRating = (data) => API.post("/ratings/", data);
export const getProviderRatings = (providerId) =>
  API.get(`/ratings/provider/${providerId}/`);