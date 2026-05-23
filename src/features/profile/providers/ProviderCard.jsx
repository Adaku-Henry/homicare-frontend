import React from "react";
import "./ProviderCard.css";

function ProviderCard({ provider, onBook }) {
  return (
    <div className="provider-card">

      <div className="provider-top">
        <h3>{provider.name}</h3>
        <span className="rating">⭐ {provider.rating}</span>
      </div>

      <p className="service">{provider.service}</p>

      <div className="provider-meta">
        <span>📍 {provider.distance} km away</span>
        <span>💰 UGX {provider.rate || "Negotiable"}</span>
      </div>

      <button onClick={() => onBook(provider)}>
        Book Now
      </button>

    </div>
  );
}

export default ProviderCard;