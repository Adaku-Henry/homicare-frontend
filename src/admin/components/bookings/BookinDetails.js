import React from "react";

export default function BookingDetails({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div style={{
      position: "fixed",
      right: 0,
      top: 0,
      width: 350,
      height: "100%",
      background: "#fff",
      boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
      padding: 20
    }}>

      <h3>Booking Details</h3>

      <p><b>Client:</b> {booking.client}</p>
      <p><b>Provider:</b> {booking.provider}</p>
      <p><b>Service:</b> {booking.service}</p>
      <p><b>Status:</b> {booking.status}</p>
      <p><b>Date:</b> {booking.date}</p>
      <p><b>Amount:</b> UGX {booking.amount}</p>

      <hr />

      <button>Assign Provider</button>
      <button>Change Status</button>
      <button style={{ color: "red" }}>Cancel Booking</button>

      <br /><br />

      <button onClick={onClose}>Close</button>

    </div>
  );
}