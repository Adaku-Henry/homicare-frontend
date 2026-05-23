import React from "react";
import { useNavigate } from "react-router-dom";

function BookingCard({ booking }) {

  const navigate = useNavigate();

  return (

    <div
      className="booking-card"
      onClick={() => navigate(`/bookings/${booking._id}`)}
    >

      <h3>{booking.service}</h3>

      <p>Status: {booking.status}</p>

      <p>Date: {booking.date}</p>

    </div>

  );

}

export default BookingCard;