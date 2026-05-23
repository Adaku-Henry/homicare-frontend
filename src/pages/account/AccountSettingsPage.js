// src/pages/account/CloseAccountPage.js
import React, { useState } from "react";
import "./CloseAccountPage.css";

function CloseAccountPage() {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleCloseAccount = () => {
    if (!reason) {
      alert("Please select a reason before closing your account.");
      return;
    }
    if (!confirmed) {
      alert("Please confirm that you want to close your account.");
      return;
    }
    // Here you can add API call to delete account
    alert("Your account has been successfully closed. Thank you for using our service.");
    // Reset form
    setReason("");
    setFeedback("");
    setConfirmed(false);
  };

  return (
    <div className="close-account-page">
      <h1>Close Account</h1>

      <div className="warning-section">
        <h2>Warning!</h2>
        <p>
          Closing your account will permanently delete all your data, including bookings, messages, and preferences.
          This action cannot be undone.
        </p>
      </div>

      <div className="reason-section">
        <h2>Select a reason for closing your account:</h2>
        <div className="reason-option">
          <input type="radio" name="reason" value="Not satisfied" checked={reason === "Not satisfied"} onChange={(e) => setReason(e.target.value)} />
          <label>Not satisfied with the service</label>
        </div>
        <div className="reason-option">
          <input type="radio" name="reason" value="Found alternative" checked={reason === "Found alternative"} onChange={(e) => setReason(e.target.value)} />
          <label>Found an alternative service</label>
        </div>
        <div className="reason-option">
          <input type="radio" name="reason" value="Privacy concerns" checked={reason === "Privacy concerns"} onChange={(e) => setReason(e.target.value)} />
          <label>Privacy concerns</label>
        </div>
        <div className="reason-option">
          <input type="radio" name="reason" value="Other" checked={reason === "Other"} onChange={(e) => setReason(e.target.value)} />
          <label>Other</label>
        </div>
      </div>

      <div className="feedback-section">
        <label>Additional feedback (optional):</label>
        <textarea placeholder="Tell us why you are leaving..." value={feedback} onChange={(e) => setFeedback(e.target.value)} />
      </div>

      <div className="reason-option">
        <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
        <label>I understand that closing my account is permanent and I want to proceed.</label>
      </div>

      <button className="close-btn" onClick={handleCloseAccount}>Close Account</button>
    </div>
  );
}

export default CloseAccountPage;