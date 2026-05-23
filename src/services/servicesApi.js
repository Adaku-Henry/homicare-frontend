import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/bookings/", // Django backend
});

// CRUD
export const getBookings = () => API.get("/");
export const getBookingDetails = (id) => API.get(`${id}/`);
export const createBooking = (data) => API.post("/", data);

// Actions
export const acceptBooking = (id) => API.post(`${id}/accept/`);
export const startBooking = (id) => API.post(`${id}/start/`);
export const completeBooking = (id) => API.post(`${id}/complete/`);
export const cancelBooking = (id) => API.post(`${id}/cancel/`);
export const rateBooking = (id, data) => API.post(`${id}/rate/`, data);