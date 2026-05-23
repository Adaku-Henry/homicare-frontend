import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "60px",
        background: "#111827",
        color: "white",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <h1>Find Trusted Home Services in Seconds</h1>
      <p>Cleaning • Babysitting • Plumbing • Electricians • Laundry</p>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "#f97316",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => navigate("/services")}
      >
        Explore Services
      </button>
    </div>
  );
}

export default HeroSection;