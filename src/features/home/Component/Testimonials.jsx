import React from "react";

const reviews = [
  {
    name: "Amina",
    text: "HomiCare saved me time. The cleaner was amazing!",
  },
  {
    name: "Brian",
    text: "Very fast booking system and trusted providers.",
  },
];

function Testimonials() {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2>What Users Say</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {reviews.map((r, i) => (
          <div
            key={i}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              flex: 1,
              minWidth: "250px",
            }}
          >
            <p>"{r.text}"</p>
            <strong>- {r.name}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
