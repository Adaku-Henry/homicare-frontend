import { useState } from "react";
import RatingModal from "../../components/bookings/RatingModal";

const MyBookings = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    { id: 1, service: "Cleaning" },
    { id: 2, service: "Plumbing" },
  ];

  const rateBooking = (id) => {
    setSelectedBooking(id);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <h2 className="text-xl font-bold mb-4">My Bookings</h2>

      {/* BOOKINGS LIST */}
      <div className="space-y-3">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{booking.service}</p>
              <p className="text-sm text-gray-500">
                Booking ID: {booking.id}
              </p>
            </div>

            <button
              onClick={() => rateBooking(booking.id)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg"
            >
              Rate
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <RatingModal
          bookingId={selectedBooking}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MyBookings;