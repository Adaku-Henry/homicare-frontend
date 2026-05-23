export const getBookings = async () => {
  const res = await fetch("/api/bookings");
  return res.json();
};

export const updateBookingStatus = async (id, status) => {
  const res = await fetch(`/api/bookings/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

export const assignProvider = async (bookingId, providerId) => {
  const res = await fetch(`/api/bookings/${bookingId}/assign`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ providerId }),
  });
  return res.json();
};

export const deleteBooking = async (id) => {
  const res = await fetch(`/api/bookings/${id}`, {
    method: "DELETE",
  });
  return res.json();
};