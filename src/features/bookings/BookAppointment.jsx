import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBookings from "../../hooks/useBookings";
import services from "../../pages/services/serviceData";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createBooking } = useBookings();

  // 🔥 SAFETY FIX (PREVENT CRASH)
  const serviceList = Array.isArray(services) ? services : [];

  const service = serviceList.find(
    (s) => s.id === Number(id)
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const submitBooking = () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    createBooking({
      serviceId: id,
      serviceName: service?.name || "Unknown Service",
      date,
      time,
      notes,
    });

    navigate("/bookings");
  };

  return (
    <div className="main-content">

      <h2>
        Book Service: {service?.name || "Loading..."}
      </h2>

      <label>Date</label>
      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <br /><br />

      <label>Time</label>
      <input type="time" onChange={(e) => setTime(e.target.value)} />

      <br /><br />

      <label>Notes</label>
      <textarea
        placeholder="Additional instructions..."
        onChange={(e) => setNotes(e.target.value)}
      />

      <br /><br />

      <button onClick={submitBooking}>
        Confirm Booking
      </button>

    </div>
  );
}

export default BookAppointment;