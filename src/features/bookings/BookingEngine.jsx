import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../../context/BookingContext";
import services from "../../../pages/services/serviceData";

import "./booking.css";

function BookingEngine() {
  const navigate = useNavigate();

  const {
    booking,
    selectService,
    selectProvider,
    setMode,
    setSchedule,
    setLocation,
    setNotes,
    calculatePrice,
    confirmBooking,
    step,
    nextStep,
    prevStep,
  } = useBooking();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotesInput] = useState("");

  const providers = [
    { id: 1, name: "John Cleaner", service: "Cleaning", rating: 4.8 },
    { id: 2, name: "Electric Pro", service: "Electrical", rating: 4.7 },
    { id: 3, name: "Plumber Max", service: "Plumbing", rating: 4.9 }
  ];

  const modes = [
    { id: "voice", label: "Voice Call 📞" },
    { id: "video", label: "Video Call 🎥" },
    { id: "whatsapp", label: "WhatsApp 💬" },
    { id: "audio", label: "Audio Call 🎧" },
    { id: "visit", label: "Home Visit 🏠" }
  ];

  const handleConfirm = () => {
    setSchedule(date, time);
    setLocation({ address });
    setNotes(notesInput);

    calculatePrice();
    confirmBooking();

    navigate("/booking-success");
  };

  return (
    <div className="booking-engine">

      <h1>🚀 HomiCare Booking Engine</h1>

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <div>
          <h2>Select Service</h2>

          <div className="grid">
            {services.map((s) => (
              <div
                key={s.id}
                className="card"
                onClick={() => selectService(s)}
              >
                <h3>{s.name}</h3>
                <p>{s.category}</p>
              </div>
            ))}
          </div>

          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <div>
          <h2>Select Provider</h2>

          {providers
            .filter(p => p.service === booking.service?.name)
            .map(p => (
              <div
                key={p.id}
                className="card"
                onClick={() => selectProvider(p)}
              >
                <h3>{p.name}</h3>
                <p>⭐ {p.rating}</p>
              </div>
            ))}

          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <div>
          <h2>Select Mode</h2>

          {modes.map((m) => (
            <div
              key={m.id}
              className="card"
              onClick={() => setMode(m.id)}
            >
              {m.label}
            </div>
          ))}

          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {/* ================= STEP 4 ================= */}
      {step === 4 && (
        <div>
          <h2>Schedule</h2>

          <input type="date" onChange={(e) => setDate(e.target.value)} />
          <input type="time" onChange={(e) => setTime(e.target.value)} />

          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {/* ================= STEP 5 ================= */}
      {step === 5 && (
        <div>
          <h2>Location</h2>

          <input
            type="text"
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
          />

          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {/* ================= STEP 6 ================= */}
      {step === 6 && (
        <div>
          <h2>Notes</h2>

          <textarea
            placeholder="Extra instructions..."
            onChange={(e) => setNotesInput(e.target.value)}
          />

          <button onClick={prevStep}>Back</button>
          <button onClick={handleConfirm}>
            Confirm Booking
          </button>
        </div>
      )}

    </div>
  );
}

export default BookingEngine;