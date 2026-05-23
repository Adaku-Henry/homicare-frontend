// src/pages/account/FollowedProvidersPage.js
import React, { useState } from "react";
import "./FollowedProvidersPage.css";

// Sample data
const followedProvidersSample = [
  {
    id: 1,
    name: "John Cleaning",
    category: "Cleaning",
    rating: 4.8,
    services: ["Deep Cleaning", "Carpet Cleaning"],
    image: "", // Add profile image URL
  },
  {
    id: 2,
    name: "Lucy Laundry",
    category: "Laundry",
    rating: 4.7,
    services: ["Wash & Fold", "Ironing"],
    image: "",
  },
  {
    id: 3,
    name: "Peter Electric",
    category: "Electrical",
    rating: 4.6,
    services: ["Wiring", "Appliance Repair"],
    image: "",
  },
];

function FollowedProvidersPage() {
  const [providers, setProviders] = useState(followedProvidersSample);

  const removeProvider = (id) => {
    const updated = providers.filter((p) => p.id !== id);
    setProviders(updated);
  };

  return (
    <div className="followed-providers-page">
      <h1>Followed Providers</h1>
      {providers.length === 0 ? (
        <p>You are not following any providers yet.</p>
      ) : (
        <div className="providers-grid">
          {providers.map((provider) => (
            <div key={provider.id} className="provider-card">
              <div className="provider-image">
                {provider.image ? (
                  <img src={provider.image} alt={provider.name} />
                ) : (
                  <div className="placeholder">{provider.name.charAt(0)}</div>
                )}
              </div>
              <div className="provider-info">
                <h3>{provider.name}</h3>
                <p>Category: {provider.category}</p>
                <p>
                  Rating: {provider.rating} ⭐
                </p>
                <p>
                  Services: {provider.services.join(", ")}
                </p>
              </div>
              <div className="provider-actions">
                <button onClick={() => alert(`Viewing profile of ${provider.name}`)}>View Profile</button>
                <button onClick={() => alert(`Messaging ${provider.name}`)}>Message</button>
                <button className="remove" onClick={() => removeProvider(provider.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FollowedProvidersPage;