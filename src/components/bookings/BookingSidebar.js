import React from "react";
import { Link } from "react-router-dom";

function BookingSidebar() {
  return (
    <div className="booking-sidebar">

      <h2>Bookings</h2>

      <ul>
        <li>
          <Link to="/bookings/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/bookings/my-bookings">My Bookings</Link>
        </li>

        <li>
          <Link to="/bookings/create">Create Booking</Link>
        </li>

        <li>
          <Link to="/bookings/history">Booking History</Link>
        </li>

        <li>
          <Link to="/bookings/messages">Messages</Link>
        </li>

      </ul>

    </div>
  );
}

export default BookingSidebar;