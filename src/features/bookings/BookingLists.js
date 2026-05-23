import React, { useEffect, useState } from "react";
import { getBookings } from "../../services/api";
import { useNavigate } from "react-router-dom";

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>

      {bookings.map((b) => (
        <div key={b.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><strong>{b.service}</strong></p>
          <p>{b.date} at {b.time}</p>

          <button onClick={() => navigate(`/bookings/${b.id}`)}>
            View Details
          </button>

          <button onClick={() => navigate(`/chat/${b.id}`)}>
            Chat
          </button>
        </div>
      ))}
    </div>
  );
}

export default BookingsList;