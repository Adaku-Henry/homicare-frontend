import React, { useState } from "react";
import axios from "axios";

function BookingForm() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    address: "",
    date: "",
    message: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post("http://localhost:5000/api/bookings", form);

      alert("Bookings successful");

    } catch (error) {

      alert("Bookings failed");

    }

  };

  return (

    <form onSubmit={handleSubmit} className="booking-form">

      <input
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
      />

      <input
        name="service"
        placeholder="Service Needed"
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Service Address"
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        onChange={handleChange}
      />

      <textarea
        name="message"
        placeholder="Additional details"
        onChange={handleChange}
      />

      <button type="submit">
        Confirm Booking
      </button>

    </form>

  );
}

export default BookingForm;