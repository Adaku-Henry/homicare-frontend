import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "240px",
        background: "#ffc301",
        color: "#fff",
        padding: "20px"
      }}>
        <h2 style={{ marginBottom: 20 }}>Admin Panel</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>

          <Link to="/admin/dashboard" style={link}>Dashboard</Link>
          <Link to="/admin/users" style={link}>Users</Link>
          <Link to="/admin/providers" style={link}>Providers</Link>
          <Link to="/admin/bookings" style={link}>Bookings</Link>
          <Link to="/admin/analytics" style={link}>Analytics</Link>
          <Link to="/admin/realtime" style={link}>Realtime</Link>
          <Link to="/admin/settings" style={link}>Settings</Link>

        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: 20, background: "#f1f5f9" }}>
        <Outlet />
      </div>

    </div>
  );
}

const link = {
  color: "#fff",
  textDecoration: "none",
  padding: "8px",
  borderRadius: "6px",
  background: "#ffa202",
};