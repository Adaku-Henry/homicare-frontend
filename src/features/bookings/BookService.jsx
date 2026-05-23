import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import "./booking.css";

const services = [
  { id: 1, name: "Plumber", price: 20000, icon: "🔧" },
  { id: 2, name: "Electrician", price: 25000, icon: "💡" },
  { id: 3, name: "Cleaner", price: 15000, icon: "🧹" },
  { id: 4, name: "Mechanic", price: 30000, icon: "🚗" },
  { id: 5, name: "Carpenter", price: 22000, icon: "🪚" },
  { id: 6, name: "Painter", price: 18000, icon: "🎨" },
];

const modes = [
  { id: "voice", label: "Voice Call", icon: "📞" },
  { id: "video", label: "Video Call", icon: "🎥" },
  { id: "audio", label: "Audio Call", icon: "🎧" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬" },
  { id: "visit", label: "Home Visit", icon: "🏠" },
];

const BookService = () => {

  const navigate = useNavigate();

  const {
    booking,
    step,
    selectService,
    setMode,
    setSchedule,
    setLocation,
    calculatePrice,
    nextStep,
    prevStep,
    confirmBooking,
  } = useBooking();

  // ================= AUTO PRICE UPDATE =================
  useEffect(() => {
    calculatePrice();
  }, [booking.service, booking.mode, booking.payment?.method]);

  // ================= CONFIRM =================
  const handleConfirm = () => {
    confirmBooking();
    navigate("/booking-confirmation");
  };

  return (
    <div className="booking-container">

      {/* ================= HEADER ================= */}
      <div className="booking-header">
        <h1>🛠️ Book a Service</h1>
        <p>Step {step} of 4</p>
      </div>

      {/* ================= STEP INDICATOR ================= */}
      <div className="steps-bar">
        <div className={step >= 1 ? "active" : ""}>Service</div>
        <div className={step >= 2 ? "active" : ""}>Mode</div>
        <div className={step >= 3 ? "active" : ""}>Schedule</div>
        <div className={step >= 4 ? "active" : ""}>Confirm</div>
      </div>

      {/* ================= STEP 1: SERVICE ================= */}
      {step === 1 && (
        <div className="grid">
          {services.map((s) => (
            <div
              key={s.id}
              className={`card ${booking.service?.id === s.id ? "selected" : ""}`}
              onClick={() => selectService(s)}
            >
              <h2>{s.icon} {s.name}</h2>
              <p>UGX {s.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* ================= STEP 2: MODE ================= */}
      {step === 2 && (
        <div className="grid">
          {modes.map((m) => (
            <div
              key={m.id}
              className={`card ${booking.mode === m.id ? "selected" : ""}`}
              onClick={() => setMode(m.id)}
            >
              <h2>{m.icon}</h2>
              <p>{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* ================= STEP 3: SCHEDULE ================= */}
      {step === 3 && (
        <div className="form">
          <input
            type="date"
            onChange={(e) =>
              setSchedule(e.target.value, booking.schedule.time)
            }
          />

          <input
            type="time"
            onChange={(e) =>
              setSchedule(booking.schedule.date, e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Enter your location"
            onChange={(e) =>
              setLocation({
                address: e.target.value,
                latitude: null,
                longitude: null,
              })
            }
          />
        </div>
      )}

      {/* ================= STEP 4: CONFIRM ================= */}
      {step === 4 && (
        <div className="summary">

          <h2>Booking Summary</h2>

          <p><b>Service:</b> {booking.service?.name}</p>
          <p><b>Mode:</b> {booking.mode}</p>
          <p><b>Date:</b> {booking.schedule.date}</p>
          <p><b>Time:</b> {booking.schedule.time}</p>
          <p><b>Location:</b> {booking.location.address}</p>

          <div className="price-box">
            <h3>Total: UGX {booking.pricing.total}</h3>
          </div>

        </div>
      )}

      {/* ================= NAVIGATION ================= */}
      <div className="nav-buttons">

        {step > 1 && (
          <button onClick={prevStep} className="back">
            Back
          </button>
        )}

        {step < 4 && (
          <button onClick={nextStep} className="next">
            Next
          </button>
        )}

        {step === 4 && (
          <button onClick={handleConfirm} className="confirm">
            Confirm Booking
          </button>
        )}

      </div>

    </div>
  );
};

export default BookService;