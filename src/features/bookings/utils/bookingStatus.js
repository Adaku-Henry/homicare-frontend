export const updateBookingStatus = (id, status) => {
  const saved = JSON.parse(localStorage.getItem("bookings")) || [];

  const updated = saved.map(b =>
    b.id === id ? { ...b, status } : b
  );

  localStorage.setItem("bookings", JSON.stringify(updated));
};