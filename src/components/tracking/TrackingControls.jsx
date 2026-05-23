import React from "react";
import "./Tracking.css";

function TrackingControls({
  onStart,
  onStop,
  onShare,
  onEmergency,
  isTracking
}) {
  return (
    <div className="controls-container">

      {/* ================= TITLE ================= */}
      <h3>🎛️ Tracking Controls</h3>

      {/* ================= MAIN ACTIONS ================= */}
      <div className="controls-grid">

        <button
          className="btn start"
          onClick={onStart}
          disabled={isTracking}
        >
          🚀 Start Tracking
        </button>

        <button
          className="btn stop"
          onClick={onStop}
        >
          🛑 Stop Tracking
        </button>

      </div>

      {/* ================= SECONDARY ACTIONS ================= */}
      <div className="controls-grid">

        <button
          className="btn share"
          onClick={onShare}
        >
          🔗 Share Tracking
        </button>

        <button
          className="btn emergency"
          onClick={onEmergency}
        >
          🚨 Emergency Alert
        </button>

      </div>

      {/* ================= SAFETY INFO ================= */}
      <div className="safety-box">

        <h4>🔐 Safety & Trust System</h4>

        <ul>
          <li>✔ Real-time provider tracking</li>
          <li>✔ Secure booking verification</li>
          <li>✔ Emergency alert system</li>
          <li>✔ Location transparency</li>
        </ul>

      </div>

    </div>
  );
}

export default TrackingControls;