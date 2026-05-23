import React from "react";
import { analyticsData } from "../pages/analyticsData";
import StatsCard from "../pages/StatsCard";

export default function Analytics() {
  const {
    users = 0,
    providers = 0,
    bookings = 0,
    revenue = 0,
    providerStats = {},
    bookingTrend = [],
    revenueTrend = [],
  } = analyticsData || {};

  return (
    <div style={{ padding: 20 }}>

      <h2>Analytics Dashboard</h2>

      <div style={{ display: "flex", gap: 10 }}>
        <StatsCard title="Users" value={users} color="blue" />
        <StatsCard title="Providers" value={providers} color="green" />
        <StatsCard title="Bookings" value={bookings} color="orange" />
        <StatsCard title="Revenue" value={revenue} color="purple" />
      </div>

      <h3>Provider Stats</h3>
      <p>Approved: {providerStats.approved || 0}</p>
      <p>Pending: {providerStats.pending || 0}</p>
      <p>Rejected: {providerStats.rejected || 0}</p>

      <h3>Booking Trend</h3>
      {bookingTrend.map((b, i) => (
        <p key={i}>{b.label}: {b.value}</p>
      ))}

      <h3>Revenue Trend</h3>
      {revenueTrend.map((r, i) => (
        <p key={i}>{r.label}: UGX {r.value}</p>
      ))}

    </div>
  );
}