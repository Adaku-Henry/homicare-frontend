import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    if (!email) {
      alert("Enter your email");
      return;
    }

    alert("Password reset link sent (simulated) ✅");

    // simulate reset success → go home
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Reset Your Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}

export default ForgotPassword;