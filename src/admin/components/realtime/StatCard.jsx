import React from "react";

export default function StatsCard({ title, value, color }) {
  return (
    <div style={{
      background: "#fff",
      padding: 20,
      borderRadius: 10,
      flex: 1,
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      borderLeft: `5px solid ${color}`
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}