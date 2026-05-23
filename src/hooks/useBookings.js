import { useState, useEffect } from "react";

function useBookings() {
  const [bookings, setBookings] = useState([]);

  // Load from storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("homicare_bookings")) || [];
    setBookings(stored);
  }, []);

  // Save helper
  const persist = (data) => {
    localStorage.setItem("homicare_bookings", JSON.stringify(data));
    setBookings(data);
  };

  // CREATE booking
  const createBooking = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      serviceId: bookingData.serviceId,
      serviceName: bookingData.serviceName,
      providerId: bookingData.providerId || null,
      providerName: bookingData.providerName || "Not Assigned",
      date: bookingData.date,
      time: bookingData.time,
      status: "pending",
      notes: bookingData.notes || "",
      createdAt: new Date().toISOString(),
    };

    const updated = [...bookings, newBooking];
    persist(updated);
  };

  // UPDATE status
  const updateStatus = (id, status) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status } : b
    );
    persist(updated);
  };

  // CANCEL
  const cancelBooking = (id) => {
    updateStatus(id, "cancelled");
  };

  // DELETE permanently
  const deleteBooking = (id) => {
    const updated = bookings.filter((b) => b.id !== id);
    persist(updated);
  };

  // FILTERS
  const getBookingsByStatus = (status) => {
    return bookings.filter((b) => b.status === status);
  };

  const getUserBookings = () => bookings;

  return {
    bookings,
    createBooking,
    updateStatus,
    cancelBooking,
    deleteBooking,
    getBookingsByStatus,
    getUserBookings,
  };
}

export default useBookings;