import React from "react";

const steps = [
  { title: "Search", desc: "Find a service you need" },
  { title: "Choose Provider", desc: "Pick trusted professionals" },
  { title: "Book", desc: "Schedule instantly" },
  { title: "Enjoy", desc: "Get the service at your door" },
];

function HowItWorks() {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2>How It Works</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              minWidth: "200px",
              background: "#f3f4f6",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;