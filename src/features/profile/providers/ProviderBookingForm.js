// src/pages/providers/ProviderBookingForm.js
import React, { useState } from "react";
import "./ProviderBookingForm.css";

function ProviderBookingForm({ provider, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bookings submitted:", { provider: provider.name, ...formData });
    alert(`Booking confirmed for ${provider.name} on ${formData.date} at ${formData.time}`);
    onClose();
  };

  return (
    <div className="booking-form-overlay">
      <div className="booking-form-container">
        <h2>Book {provider.name}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Phone / Email"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <textarea
            name="notes"
            placeholder="Additional notes"
            value={formData.notes}
            onChange={handleChange}
          />
          <div className="booking-buttons">
            <button type="submit">Confirm Booking</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProviderBookingForm;