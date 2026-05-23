import React from "react";
import { useParams } from "react-router-dom";
import "./ProviderPage.css"; // we’ll create this
import ProviderCard from "./ProviderCard"; // reuse your card if exists

// Sample provider data
const allProviders = {
  electrician: [
    {
      id: 1,
      name: "John Electrician",
      rating: 4.8,
      experience: "5 years",
      services: ["Wiring", "Socket repair", "Lighting installation"],
      location: "Arua",
    },
    {
      id: 2,
      name: "PowerFix Ltd",
      rating: 4.5,
      experience: "3 years",
      services: ["Appliance repair", "Installations"],
      location: "Kampala",
    },
  ],
  plumber: [
    {
      id: 3,
      name: "Sam Plumbing",
      rating: 4.7,
      experience: "4 years",
      services: ["Pipe repair", "Drain cleaning"],
      location: "Arua",
    },
  ],
  // add more categories if needed
};

function ProviderPage() {
  const { categoryName } = useParams();
  const providers = allProviders[categoryName.toLowerCase()] || [];

  return (
    <div className="provider-page">
      <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Providers</h2>
      {providers.length === 0 && <p>No providers available yet.</p>}
      <div className="providers-grid">
        {providers.map((provider) => (
          <div key={provider.id} className="provider-card">
            <h3>{provider.name}</h3>
            <p>⭐ {provider.rating} | {provider.experience}</p>
            <p>Location: {provider.location}</p>
            <p>Services: {provider.services.join(", ")}</p>
            <button
              onClick={() => alert(`Go to booking form for ${provider.name}`)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProviderPage;