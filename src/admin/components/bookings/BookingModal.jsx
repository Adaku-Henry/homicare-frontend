import React from "react";

function BookingModal({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white p-6 rounded w-96">

        <h2 className="text-xl font-bold mb-3">Booking Details</h2>

        <p><b>Service:</b> {booking.service}</p>
        <p><b>Customer:</b> {booking.customerName}</p>
        <p><b>Status:</b> {booking.status}</p>
        <p><b>Date:</b> {booking.date}</p>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default BookingModal;