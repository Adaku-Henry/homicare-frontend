import React from "react";
import { useParams, Link } from "react-router-dom";
import providers from "../../../data/providers";

function Providers() {
  const { service } = useParams();

  // Ensure case-insensitive matching (avoids bugs)
  const filtered = providers.filter(
    (p) => p.service.toLowerCase() === service.toLowerCase()
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>{service} Providers</h2>

      {filtered.length === 0 ? (
        <p>No providers found for this service.</p>
      ) : (
        filtered.map((provider) => (
          <div
            key={provider.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{provider.name}</h3>
            <p>Rating: {provider.rating}</p>

            <Link to={`/provider/${provider.id}`}>
              View Profile
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Providers;