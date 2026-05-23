import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProvidersList.css";

function ProviderCard({ id, name, profession, location, rating, verified }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/providers/${id}`);
  };

  return (
    <div className="provider-card" onClick={handleClick}>
      <div className="provider-header">
        <h3>{name}</h3>
        {verified && <span className="verified-badge">✔ Verified</span>}
      </div>
      <p className="provider-profession">{profession}</p>
      <p className="provider-location">{location}</p>
      <p className="provider-rating">⭐ {rating}</p>
    </div>
  );
}

export default ProviderCard;