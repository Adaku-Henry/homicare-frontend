import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [aiTip, setAiTip] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("providerProfile"));
    if (saved) setProfile(saved);

    generateAITip();
  }, []);

  const generateAITip = () => {
    const tips = [
      "🔥 You get more jobs in the evening. Stay active!",
      "💡 Improve your profile picture to increase trust.",
      "📈 Fast responses = more earnings. Try replying quicker.",
      "⭐ Ask happy customers to leave reviews.",
    ];
    setAiTip(tips[Math.floor(Math.random() * tips.length)]);
  };

  const toggleAvailability = () => {
    const updated = { ...profile, available: !profile.available };
    setProfile(updated);
    localStorage.setItem("providerProfile", JSON.stringify(updated));
  };

  return (
    <div style={container}>
      <h1 style={title}>Provider Dashboard</h1>

      {/* ===== STATS ===== */}
      <div style={grid}>
        <Card title="Jobs" value={profile.jobs || 12} />
        <Card title="Earnings" value={`UGX ${profile.earnings || 250000}`} />
        <Card title="Reviews" value={profile.reviews || 8} />
        <Card title="Rating" value={`${profile.rating || 4.5} ⭐`} />
      </div>

      {/* ===== AI INSIGHT ===== */}
      <div style={aiBox}>
        <h3>🤖 AI Insight</h3>
        <p>{aiTip}</p>
        <button style={btn} onClick={generateAITip}>
          Refresh Insight
        </button>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div style={mainGrid}>

        {/* LEFT */}
        <div>

          <Section title="Recent Jobs">
            <JobItem title="Plumbing Fix" status="Pending" />
            <JobItem title="House Cleaning" status="Completed" />
            <JobItem title="Electrical Work" status="Paid" />
          </Section>

          <Section title="Latest Reviews">
            <p>⭐⭐⭐⭐⭐ Excellent work!</p>
            <p>⭐⭐⭐⭐ Very reliable</p>
          </Section>

        </div>

        {/* RIGHT */}
        <div>

          <Section title="Wallet">
            <h2 style={{ margin: 0 }}>UGX {profile.wallet || 150000}</h2>
            <button style={btn}>Withdraw</button>
          </Section>

          <Section title="Quick Actions">
            <button style={btn} onClick={() => navigate("/provider/edit-profile")}>
              Edit Profile
            </button>

            <button style={btn} onClick={() => navigate("/provider/jobs")}>
              View Jobs
            </button>

            <button style={btn} onClick={() => navigate("/wallet")}>
              Wallet
            </button>
          </Section>

          <Section title="Availability">
            <p style={{
              color: profile.available ? "#22c55e" : "#ef4444",
              fontWeight: "bold"
            }}>
              {profile.available ? "🟢 Available" : "🔴 Offline"}
            </p>

            <button style={btn} onClick={toggleAvailability}>
              Toggle Status
            </button>
          </Section>

        </div>
      </div>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function Card({ title, value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.toString().replace(/\D/g, "")) || value;

    if (typeof end === "number") {
      let duration = 800;
      let increment = end / (duration / 16);

      let counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(counter);
        }
        setDisplay(Math.floor(start));
      }, 16);
    } else {
      setDisplay(value);
    }
  }, [value]);

  return (
    <div style={card}>
      <h4 style={{ opacity: 0.7 }}>{title}</h4>
      <h2>{typeof value === "string" ? value : display}</h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={section}>
      <h3 style={{ marginBottom: 10 }}>{title}</h3>
      {children}
    </div>
  );
}

function JobItem({ title, status }) {
  const statusColor = {
    Pending: "#facc15",
    Completed: "#22c55e",
    Paid: "#3b82f6"
  };

  return (
    <div style={job}>
      <span>{title}</span>
      <span style={{
        color: statusColor[status] || "#ccc",
        fontWeight: "bold"
      }}>
        {status}
      </span>
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  padding: 20,
  background: "linear-gradient(135deg,#0f172a,#1e293b)",
  minHeight: "100vh",
  color: "white"
};

const title = { marginBottom: 20 };

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: 15,
};

const mainGrid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: 20,
  marginTop: 20,
};

const card = {
  background: "rgba(255,255,255,0.08)",
  padding: 20,
  borderRadius: 12,
  textAlign: "center",
  backdropFilter: "blur(10px)",
  transition: "0.3s"
};

const section = {
  background: "rgba(255,255,255,0.08)",
  padding: 15,
  borderRadius: 12,
  marginBottom: 15,
  backdropFilter: "blur(10px)"
};

const job = {
  display: "flex",
  justifyContent: "space-between",
  padding: 10,
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const btn = {
  width: "100%",
  padding: 10,
  marginTop: 10,
  background: "linear-gradient(135deg,#3b82f6,#06b6d4)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  transition: "0.3s"
};

const aiBox = {
  marginTop: 20,
  padding: 15,
  borderRadius: 12,
  background: "rgba(59,130,246,0.1)",
  backdropFilter: "blur(10px)"
};