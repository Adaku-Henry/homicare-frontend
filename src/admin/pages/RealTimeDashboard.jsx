import React, { useEffect, useState } from "react";
import { socket } from "../components/realtime/socket";

export default function RealTimeDashboard() {
  const [liveUsers, setLiveUsers] = useState([]);
  const [liveProviders, setLiveProviders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [bookings, setBookings] = useState([]);

  // ================= CONNECT SOCKET =================
  useEffect(() => {
    // USER ONLINE EVENT
    socket.on("user_online", (user) => {
      setLiveUsers((prev) => [user, ...prev]);
    });

    // PROVIDER REGISTER EVENT
    socket.on("provider_registered", (provider) => {
      setLiveProviders((prev) => [provider, ...prev]);
    });

    // NEW BOOKING EVENT
    socket.on("new_booking", (booking) => {
      setBookings((prev) => [booking, ...prev]);
    });

    // NOTIFICATIONS
    socket.on("admin_notification", (note) => {
      setNotifications((prev) => [note, ...prev]);
    });

    return () => {
      socket.off("user_online");
      socket.off("provider_registered");
      socket.off("new_booking");
      socket.off("admin_notification");
    };
  }, []);

  return (
    <div style={container}>
      <h2>⚡ Real-Time Admin Dashboard</h2>

      {/* ================= STATS ================= */}
      <div style={grid}>
        <Card title="Live Users" value={liveUsers.length} />
        <Card title="New Providers" value={liveProviders.length} />
        <Card title="Bookings" value={bookings.length} />
        <Card title="Alerts" value={notifications.length} />
      </div>

      {/* ================= LIVE USERS ================= */}
      <Section title="Live Users">
        {liveUsers.map((u, i) => (
          <Item key={i} text={`🟢 ${u.name || "User"} is online`} />
        ))}
      </Section>

      {/* ================= PROVIDERS ================= */}
      <Section title="New Providers">
        {liveProviders.map((p, i) => (
          <Item key={i} text={`👷 ${p.name} joined`} />
        ))}
      </Section>

      {/* ================= BOOKINGS ================= */}
      <Section title="Live Bookings">
        {bookings.map((b, i) => (
          <Item key={i} text={`📦 New booking: ${b.service}`} />
        ))}
      </Section>

      {/* ================= NOTIFICATIONS ================= */}
      <Section title="Admin Notifications">
        {notifications.map((n, i) => (
          <Item key={i} text={`🔔 ${n.message}`} />
        ))}
      </Section>
    </div>
  );
}

// ================= COMPONENTS =================
function Card({ title, value }) {
  return (
    <div style={card}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={section}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function Item({ text }) {
  return <div style={item}>{text}</div>;
}

// ================= STYLES =================
const container = { padding: 20 };

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 15,
};

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const section = {
  marginTop: 20,
  background: "#fff",
  padding: 15,
  borderRadius: 10,
};

const item = {
  padding: 8,
  borderBottom: "1px solid #eee",
};