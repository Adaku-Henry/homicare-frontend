import React, { useState } from "react";
import "./BookingDashboard.css";

function MyBookings() {

  // Dummy booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      service: "Cleaning",
      provider: "John Cleaning",
      date: "2026-03-20",
      time: "10:00",
      status: "Pending"
    },
    {
      id: 2,
      service: "Laundry",
      provider: "Mary Laundry",
      date: "2026-03-21",
      time: "14:00",
      status: "Confirmed"
    },
    {
      id: 3,
      service: "Plumbing",
      provider: "Peter Plumbing",
      date: "2026-03-22",
      time: "09:00",
      status: "Cancelled"
    }
  ]);

  // Cancel booking function
  const cancelBooking = (id) => {
    const updated = bookings.map(b =>
      b.id === id ? { ...b, status: "Cancelled" } : b
    );
    setBookings(updated);
  };

  return (
    <div className="mybookings-container">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div key={b.id} className="booking-card">

              <h3>{b.service} - {b.provider}</h3>

              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time:</strong> {b.time}</p>
              <p><strong>Status:</strong> <span className={`status ${b.status.toLowerCase()}`}>{b.status}</span></p>

              {b.status !== "Cancelled" && (
                <button className="cancel-btn" onClick={() => cancelBooking(b.id)}>
                  Cancel Booking
                </button>
              )}

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default MyBookings;