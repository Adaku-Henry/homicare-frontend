// src/services/api.js
import axios from "axios";
const API_URL = "https://your-backend.onrender.com/api";
// Bookings APIs
export const createBooking = (form) => axios.post("/api/bookings/", form);
export const getBookings = () => axios.get("/api/bookings/");
export const getBookingDetails = (id) => axios.get(`/api/bookings/${id}`);

// Chat APIs
export const getMessages = (bookingId) => axios.get(`/api/messages/${bookingId}`);
export const sendMessage = (msg) => axios.post("/api/messages/", msg);

export const getServices = async () => {
  const res = await fetch(`${API_URL}/services`);
  return res.json();
};