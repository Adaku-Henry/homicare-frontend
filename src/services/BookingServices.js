// src/features/booking/services/bookingService.js

const STORAGE_KEY = "homicare_bookings";

/**
 * =========================
 * BOOKING STORAGE SERVICE
 * =========================
 * Acts like a fake backend
 */

export const bookingService = {

  // GET ALL BOOKINGS
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // SAVE BOOKING
  create: (booking) => {
    const bookings = bookingService.getAll();

    const newBooking = {
      ...booking,
      id: Date.now(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    bookings.unshift(newBooking);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));

    return newBooking;
  },

  // GET SINGLE BOOKING
  getById: (id) => {
    return bookingService.getAll().find(b => b.id === id);
  },

  // UPDATE BOOKING
  update: (id, data) => {
    const bookings = bookingService.getAll();

    const updated = bookings.map(b =>
      b.id === id ? { ...b, ...data } : b
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return updated;
  },

  // DELETE BOOKING
  remove: (id) => {
    const bookings = bookingService.getAll().filter(b => b.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  },

  // CLEAR ALL (debug)
  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};