import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // Django server
});
const API_URL = "https://your-backend.onrender.com/api";
// Booking APIs
export const createBooking = (form) => API.post("/api/bookings/", form);
export const getBookings = () => API.get("/api/bookings/");
export const getBookingDetails = (id) => API.get(`/api/bookings/${id}/`);

// Chat APIs
export const getMessages = (bookingId) =>
  API.get(`/api/messages/${bookingId}/`);

export const sendMessage = (msg) =>
  API.post("/api/messages/", msg);

export const getServices = async () => {
  const res = await fetch(`${API_URL}/services`);
  return res.json();
};