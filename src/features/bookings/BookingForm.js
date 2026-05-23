import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import ".//Booking.css";

toast.configure();

export default function BookingForm({ services, onSubmit }) {
  const [service, setService] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("09:00");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = { service, date, time };
    const success = await onSubmit(form);
    if (success) {
      toast.success("Booking created successfully!");
      setModalOpen(true);
    } else {
      toast.error("Booking failed.");
    }
  };

  return (
    <>
      <div className="booking-container">
        <h2>Create Booking</h2>
        <form onSubmit={handleSubmit}>
          <select value={service} onChange={(e) => setService(e.target.value)} required>
            <option value="">Select a Service</option>
            {services.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>

          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            required
          />

          <TimePicker
            onChange={setTime}
            value={time}
            disableClock={true}
            minTime="08:00"
            maxTime="18:00"
            required
          />

          <button type="submit">Book Now</button>
        </form>
      </div>

      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <h2>Booking Confirmed!</h2>
        <p>{service} scheduled for {date.toLocaleDateString()} at {time}</p>
        <button onClick={() => setModalOpen(false)}>Close</button>
      </Modal>
    </>
  );
}