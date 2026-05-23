import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function ProviderLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2>Provider Panel</h2>

        <NavLink to="/provider/dashboard" style={link}>Dashboard</NavLink>
        <NavLink to="/provider/profile" style={link}>Profile</NavLink>
        <NavLink to="/provider/profile/edit" style={link}>Edit Profile</NavLink>
        <NavLink to="/provider/jobs" style={link}>Jobs</NavLink>
        <NavLink to="/provider/earnings" style={link}>Earnings</NavLink>
        <NavLink to="/provider/reviews" style={link}>Reviews</NavLink>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </div>
    </div>
  );
}

const sidebar = {
  width: 220,
  background: "#fdc004",
  color: "#fff",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 10
};

const link = {
  color: "#fff",
  textDecoration: "none",
  padding: 10,
  background: "#81f309",
  borderRadius: 6
};