import API from "./axios";

export const getBookings = () => API.get("/bookings/");
export const getMyBookings = () => API.get("/bookings/my/");
export const createBooking = (data) => API.post("/bookings/", data);
export const getBookingDetails = (id) => API.get(`/bookings/${id}/`);
export const cancelBooking = (id) => API.delete(`/bookings/${id}/`);