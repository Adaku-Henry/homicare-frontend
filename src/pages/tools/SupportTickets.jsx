import React, { useState } from "react";

function SupportTickets() {
  const [tickets] = useState([
    { id: 1, title: "Payment issue", status: "Open" },
    { id: 2, title: "Booking not confirmed", status: "Resolved" },
  ]);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Support Tickets</h2>

      {tickets.map((t) => (
        <div key={t.id} style={styles.ticket}>
          <h4>{t.title}</h4>
          <p>Status: {t.status}</p>
        </div>
      ))}
    </div>
  );
}

export default SupportTickets;

const styles = {
  ticket: {
    padding: "10px",
    marginBottom: "10px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
};