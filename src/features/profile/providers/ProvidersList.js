                          import React from "react";
import ProviderCard from "./ProviderCard";
import providers from "../../../data/providers";
import "./ProvidersList.css";

function ProvidersList() {
  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#1f3d7a", margin: "20px 0" }}>
        All Providers
      </h2>
      <div className="providers-grid">
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            id={provider.id}
            name={provider.name}
            profession={provider.profession}
            location={provider.location}
            rating={provider.rating}
            verified={provider.verified}
          />
        ))}
      </div>
    </div>
  );
}

export default ProvidersList;