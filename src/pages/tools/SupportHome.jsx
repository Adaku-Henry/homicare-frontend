import React from "react";
import { Link } from "react-router-dom";

function SupportHome() {
  return (
    <div style={styles.container}>
      <h2>Support Center</h2>
      <p>How can we help you today?</p>

      <div style={styles.grid}>

        <Link to="/support/help" style={styles.card}>
          📘 Help Center
        </Link>

        <Link to="/support/contact" style={styles.card}>
          📞 Contact Support
        </Link>

        <Link to="/support/ai" style={styles.card}>
          🤖 AI Assistant
        </Link>

        <Link to="/support/tickets" style={styles.card}>
          🎫 My Tickets
        </Link>

      </div>
    </div>
  );
}

export default SupportHome;

const styles = {
  container: {
    padding: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    textDecoration: "none",
    color: "#333",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};