// src/pages/providers/ProviderBookingForm.js
import React, { useState, useEffect } from "react";
import "./ProviderBookingForm.css";

function ProviderBookingForm({ provider, onClose }) {

  // ================= FORM STATE =================
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    duration: 1,
    serviceType: "",
    notes: "",
  });

  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [bookingId, setBookingId] = useState("");

  // ================= PRICING ENGINE =================
  const baseRate = provider?.rate || 20000;

  useEffect(() => {
    const price = baseRate * (formData.duration || 1);
    setEstimatedPrice(price);
  }, [formData.duration, baseRate]);

  // ================= INPUT HANDLER =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= STEP VALIDATION =================
  const validateStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.contact) {
        setError("Please fill in your details");
        return false;
      }
    }

    if (step === 2) {
      if (!formData.date || !formData.time) {
        setError("Please select date and time");
        return false;
      }
    }

    setError("");
    return true;
  };

  // ================= NEXT STEP =================
  const nextStep = () => {
    if (!validateStep()) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // ================= BOOKING SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    setLoading(true);

    try {
      const id = "BK-" + Date.now();
      setBookingId(id);

      const booking = {
        id,
        provider: provider?.name,
        ...formData,
        estimatedPrice,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // SAVE LOCAL (replace with API later)
      const existing = JSON.parse(localStorage.getItem("bookings")) || [];
      localStorage.setItem(
        "bookings",
        JSON.stringify([...existing, booking])
      );

      console.log("Booking created:", booking);

      setTimeout(() => {
        setStep(4); // success screen
        setLoading(false);
      }, 1000);

    } catch (err) {
      setError("Booking failed. Try again.");
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="booking-form-overlay">

      <div className="booking-form-container">

        {/* ================= HEADER ================= */}
        <div className="booking-header">
          <h2>Book {provider?.name}</h2>
          <p>Step {step} of 4</p>
        </div>

        {/* ================= ERROR ================= */}
        {error && <div className="booking-error">{error}</div>}

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <div className="booking-step">

            <h3>Your Details</h3>

            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              name="contact"
              placeholder="Phone / Email"
              value={formData.contact}
              onChange={handleChange}
            />

            <button onClick={nextStep}>
              Next →
            </button>

          </div>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <div className="booking-step">

            <h3>Select Date & Time</h3>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />

            <div className="btnRow">
              <button onClick={prevStep}>← Back</button>
              <button onClick={nextStep}>Next →</button>
            </div>

          </div>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <div className="booking-step">

            <h3>Service Details</h3>

            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
            >
              <option value="">Select Service</option>
              <option value="cleaning">Cleaning</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="other">Other</option>
            </select>

            <input
              type="number"
              name="duration"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration (hours)"
            />

            <textarea
              name="notes"
              placeholder="Additional notes"
              value={formData.notes}
              onChange={handleChange}
            />

            <div className="priceBox">
              Estimated Price:
              <strong> UGX {estimatedPrice.toLocaleString()}</strong>
            </div>

            <div className="btnRow">
              <button onClick={prevStep}>← Back</button>
              <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>

          </div>
        )}

        {/* ================= SUCCESS ================= */}
        {step === 4 && (
          <div className="booking-success">

            <h2>🎉 Booking Confirmed!</h2>

            <p>Booking ID: {bookingId}</p>

            <p>
              You booked <strong>{provider?.name}</strong>
            </p>

            <p>
              {formData.date} at {formData.time}
            </p>

            <button onClick={onClose}>
              Close
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default ProviderBookingForm;