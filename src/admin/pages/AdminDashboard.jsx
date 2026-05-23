import React from "react";

function Card({ title, value }) {
  return (
    <div style={{
      background: "#fff",
      padding: 20,
      borderRadius: 10,
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      flex: 1
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div>

      <h2>Dashboard Overview</h2>

      {/* STATS */}
      <div style={{ display: "flex", gap: 15, marginTop: 20 }}>
        <Card title="Users" value="1,230" />
        <Card title="Providers" value="340" />
        <Card title="Bookings" value="5,120" />
        <Card title="Revenue" value="UGX 18.4M" />
      </div>

      {/* ACTIVITY */}
      <div style={{
        marginTop: 30,
        background: "#fff",
        padding: 20,
        borderRadius: 10
      }}>
        <h3>Live Activity</h3>

        <ul>
          <li>🟢 New user registered</li>
          <li>🟢 Booking completed</li>
          <li>🟢 Provider approved</li>
          <li>🟢 Payment received</li>
        </ul>
      </div>

    </div>
  );
}