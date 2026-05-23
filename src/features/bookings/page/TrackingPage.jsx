import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const stages = [
  "Booking Confirmed",
  "Provider Assigned",
  "Provider En Route",
  "Service Started",
  "Service Completed",
];

export default function TrackingPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [currentStage, setCurrentStage] = useState(0);
  const [status, setStatus] = useState("active");

  const booking = state?.booking || JSON.parse(localStorage.getItem("current_booking"));

  // ================= SIMULATE LIVE TRACKING =================
  useEffect(() => {
    if (status !== "active") return;

    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setStatus("completed");
          return prev;
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [status]);

  const cancelBooking = () => {
    setStatus("cancelled");
    alert("Booking Cancelled");
    navigate("/bookings");
  };

  if (!booking) {
    return <p>No active booking found</p>;
  }

  return (
    <div style={{ padding: 20 }}>

      <h2>📍 Service Tracking</h2>

      {/* BOOKING INFO */}
      <div style={box}>
        <h3>{booking.service?.name || "Service"}</h3>
        <p>Provider: {booking.provider?.name || "Pending"}</p>
        <p>Mode: {booking.mode}</p>
        <p>Status: {status}</p>
      </div>

      {/* TIMELINE */}
      <div style={box}>
        <h3>Progress</h3>

        {stages.map((stage, index) => (
          <div key={index} style={stepStyle(index <= currentStage)}>
            {index <= currentStage ? "✅" : "⏳"} {stage}
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => navigate("/chat")}>💬 Chat Provider</button>
        <button onClick={() => navigate("/payment")}>💳 Payment</button>
        <button onClick={cancelBooking} style={{ marginLeft: 10 }}>
          ❌ Cancel
        </button>
      </div>

      {/* ETA */}
      <div style={box}>
        <h3>⏱ ETA</h3>
        <p>{Math.max(0, 20 - currentStage * 4)} mins remaining</p>
      </div>

    </div>
  );
}

// ================= STYLES =================
const box = {
  padding: 15,
  marginTop: 15,
  border: "1px solid #ddd",
  borderRadius: 10,
};

const stepStyle = (active) => ({
  padding: 8,
  background: active ? "#e6f7ff" : "#f5f5f5",
  marginBottom: 5,
  borderRadius: 6,
});