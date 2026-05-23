import React from "react";

export default function StatsCard({ title, value, color }) {
  return (
    <div style={{
      flex: 1,
      background: "#fff",
      padding: 20,
      borderRadius: 10,
      borderLeft: `6px solid ${color}`,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h4 style={{ margin: 0, color: "#555" }}>{title}</h4>
      <h2 style={{ margin: "10px 0" }}>{value}</h2>
    </div>
  );
}