// src/pages/account/RecentlyViewedPage.js
import React, { useState } from "react";
import "./RecentlyViewedPage.css";

// Sample recently viewed providers
const recentlyViewedSample = [
  {
    id: 1,
    name: "Alice Cooking",
    category: "Cooking",
    rating: 4.9,
    lastViewed: "2026-03-15 10:23 AM",
    services: ["Meal Prep", "Catering"],
    image: "",
  },
  {
    id: 2,
    name: "Sam Plumbing",
    category: "Plumbing",
    rating: 4.5,
    lastViewed: "2026-03-14 3:45 PM",
    services: ["Pipe Repair", "Drain Cleaning"],
    image: "",
  },
  {
    id: 3,
    name: "Peter Electric",
    category: "Electrical",
    rating: 4.6,
    lastViewed: "2026-03-13 12:10 PM",
    services: ["Wiring", "Appliance Repair"],
    image: "",
  },
];

function RecentlyViewedPage() {
  const [recentlyViewed, setRecentlyViewed] = useState(recentlyViewedSample);

  const removeProvider = (id) => {
    const updated = recentlyViewed.filter((p) => p.id !== id);
    setRecentlyViewed(updated);
  };

  return (
    <div className="recently-viewed-page">
      <h1>Recently Viewed Providers</h1>
      {recentlyViewed.length === 0 ? (
        <p>No providers viewed recently.</p>
      ) : (
        <div className="providers-grid">
          {recentlyViewed.map((provider) => (
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
                <p>Rating: {provider.rating} ⭐</p>
                <p>Last Viewed: {provider.lastViewed}</p>
                <p>Services: {provider.services.join(", ")}</p>
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

export default RecentlyViewedPage;