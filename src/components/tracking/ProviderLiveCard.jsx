import React from "react";
import "./Tracking.css";

function ProviderLiveCard({ tracking, booking }) {
  return (
    <div className="tracking-card provider-card">

      {/* ================= HEADER ================= */}
      <div className="provider-header">
        <div className="avatar">
          👨‍🔧
        </div>

        <div>
          <h3>{booking?.provider?.name || "Provider"}</h3>
          <small className="muted">
            {booking?.service || "Service"}
          </small>
        </div>
      </div>

      {/* ================= STATUS ================= */}
      <div className="status-box">
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              tracking?.status === "ARRIVED 🟢"
                ? "status-arrived"
                : "status-moving"
            }
          >
            {tracking?.status || "Waiting for provider..."}
          </span>
        </p>
      </div>

      {/* ================= LIVE STATS ================= */}
      <div className="stats-grid">

        <div className="stat">
          <h4>📏 Distance</h4>
          <p>{tracking?.distance || "--"} km</p>
        </div>

        <div className="stat">
          <h4>⏱️ ETA</h4>
          <p>{tracking?.eta || "--"} min</p>
        </div>

      </div>

      {/* ================= BOOKING SUMMARY ================= */}
      <div className="summary-box">

        <h4>📦 Booking Summary</h4>

        <p>📍 Service: {booking?.service}</p>
        <p>📅 Date: {booking?.date}</p>
        <p>⏰ Time: {booking?.time}</p>

      </div>

      {/* ================= FOOTER BADGE ================= */}
      <div className="footer-badge">
        {tracking?.status === "ARRIVED 🟢" ? (
          <span className="badge success">✅ Arrived</span>
        ) : (
          <span className="badge live">🔴 Live Tracking</span>
        )}
      </div>

    </div>
  );
}

export default ProviderLiveCard;