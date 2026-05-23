// src/pages/bookings/BookingDetail.js
import React, { useEffect, useState } from "react";
import { getBookingDetails, rateBooking } from "../../services/bookingApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function BookingDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const loadBooking = async () => {
    try {
      const res = await getBookingDetails(id);
      setBooking(res.data);
    } catch (err) {
      toast.error("Failed to load booking");
    }
  };

  const handleRate = async () => {
    try {
      await rateBooking(id, { rating, review });
      toast.success("Rating saved!");
    } catch (err) {
      toast.error("Failed to save rating");
    }
  };

  useEffect(() => {
    loadBooking();
  }, [id]);

  if (!booking) return <p>Loading booking...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Booking {booking.reference}</h1>
      <p>Status: {booking.status}</p>
      <p>Provider: {booking.provider?.name}</p>
      <p>Date: {booking.booking_date}</p>
      <p>Time: {booking.booking_time}</p>
      <p>Total: UGX {booking.total_price}</p>
      <p>Location: {booking.location}</p>

      {booking.status === "COMPLETED" && (
        <div>
          <h3>Rate this booking</h3>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <textarea
            placeholder="Leave a review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button onClick={handleRate}>Submit Rating</button>
        </div>
      )}
    </div>
  );
}

export default BookingDetail;