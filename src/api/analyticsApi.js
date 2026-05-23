import API from "./axios";

export const getDashboardStats = () =>
  API.get("/analytics/dashboard/");

export const getBookingStats = () =>
  API.get("/analytics/bookings/");

export const getRevenueStats = () =>
  API.get("/analytics/revenue/");