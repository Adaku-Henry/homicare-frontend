// src/components/layouts/DashboardLayout.js
import React from "react";
import { Link, Outlet } from "react-router-dom";
import profilePic from "../../assets/profile-placeholder.png"; // add a placeholder or your image

function DashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "#1e293b",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        <div style={{ textAlign: "center" }}>
          <img src={profilePic} alt="Profile" style={{ borderRadius: "50%", width: "80px", height: "80px" }} />
          <h3 style={{ marginTop: "10px" }}>John Doe</h3>
          <p>Service Provider</p>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link to="/dashboard" style={{ color: "#151dae", textDecoration: "none" }}>Dashboard</Link>
          <Link to="/bookings" style={{ color: "#0066fd", textDecoration: "none" }}>Bookings</Link>
          <Link to="/wallet" style={{ color: "#fd9900", textDecoration: "none" }}>Wallet</Link>
          <Link to="/services" style={{ color: "#fd4d00", textDecoration: "none" }}>Services</Link>
          <Link to="/notifications" style={{ color: "#fd4d00", textDecoration: "none" }}>Notifications</Link>
          <Link to="/support" style={{ color: "#151dae", textDecoration: "none" }}>Support</Link>
          <Link to="/logout" style={{ color: "#fd4d00", textDecoration: "none" }}>Logout</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
        <Outlet /> {/* Nested routes will render here */}
      </div>
    </div>
  );
}

export default DashboardLayout;