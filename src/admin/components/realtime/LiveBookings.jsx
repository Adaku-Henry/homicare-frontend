import React from "react";

function LiveBookings({ bookings }) {
  return (
    <div className="bg-white p-3 shadow rounded">

      <h3 className="font-bold mb-2">Live Bookings</h3>

      {bookings.slice(0, 5).map(b => (
        <div key={b.id} className="border-b py-1">
          📅 {b.service} - {b.status}
        </div>
      ))}

    </div>
  );
}

export default LiveBookings;