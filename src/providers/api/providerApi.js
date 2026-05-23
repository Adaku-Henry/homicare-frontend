import axios from "axios";

// 🔥 Backend base URL (change when deploying)
const API = "http://localhost:5000/api/provider";

/* ================= GET PROFILE ================= */
export const getProviderProfile = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

/* ================= UPDATE PROFILE ================= */
export const updateProviderProfile = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

/* ================= GET JOBS ================= */
export const getProviderJobs = async (id) => {
  const res = await axios.get(`${API}/${id}/jobs`);
  return res.data;
};

/* ================= GET EARNINGS ================= */
export const getProviderEarnings = async (id) => {
  const res = await axios.get(`${API}/${id}/earnings`);
  return res.data;
};

/* ================= GET REVIEWS ================= */
export const getProviderReviews = async (id) => {
  const res = await axios.get(`${API}/${id}/reviews`);
  return res.data;
};