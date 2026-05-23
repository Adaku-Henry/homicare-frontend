import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  // ================= STATE =================
  const [provider, setProvider] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const [showContact, setShowContact] = useState(false);

  // ================= LOAD PROFILE =================
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("providerProfile")) || {};
    setProvider(data);
  }, []);

  // ================= CALCULATIONS =================
  const completion = (() => {
    let score = 0;
    if (provider.name) score += 20;
    if (provider.bio) score += 20;
    if (provider.skills?.length) score += 20;
    if (provider.avatar) score += 20;
    if (provider.location) score += 20;
    return score;
  })();

  // ================= ACTIONS =================
  const openWhatsApp = () => {
    if (!provider.phone) return alert("No phone number");
    window.open(`https://wa.me/${provider.phone}`, "_blank");
  };

  const openSMS = () => {
    if (!provider.phone) return alert("No phone number");
    window.open(`sms:${provider.phone}`);
  };

  const openMeet = () => window.open("https://meet.google.com/new");
  const openZoom = () => window.open("https://zoom.us/start/videomeeting");

  return (
    <div style={styles.page}>

      {/* ================= HERO ================= */}
      <div style={styles.hero}>
        <div style={styles.overlay}></div>

        <div style={styles.profileBox}>
          <img
            src={provider.avatar || "https://via.placeholder.com/120"}
            style={styles.avatar}
            alt=""
          />

          <h2>{provider.name || "Unnamed Provider"}</h2>
          <p>{provider.service || "Service Provider"}</p>
          <p>📍 {provider.location || "No location"}</p>

          {/* PROGRESS */}
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${completion}%` }} />
          </div>

          <small>{completion}% Profile Complete</small>

          {/* ACTIONS */}
          <div style={styles.actions}>
            <button onClick={() => setShowContact(true)} style={styles.btn}>
              Contact
            </button>
            <button style={styles.btnGreen}>Hire Me</button>
            <button onClick={() => navigate("/provider/edit")} style={styles.btn}>
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* ================= DASHBOARD TABS ================= */}
      <div style={styles.tabs}>
        {["overview", "services", "bookings", "earnings", "reviews"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tabBtn,
              background: activeTab === tab ? "#667eea" : "#fff",
              color: activeTab === tab ? "#fff" : "#000",
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ================= CONTENT ================= */}
      <div style={styles.content}>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div style={styles.grid}>
            <Card title="Bio">{provider.bio || "No bio yet"}</Card>
            <Card title="Skills">
              {(provider.skills || []).join(", ") || "No skills"}
            </Card>
            <Card title="Quick Stats">
              <p>⭐ Rating: 4.8</p>
              <p>📁 Jobs: 24</p>
              <p>👁 Profile Views: 1.2k</p>
            </Card>
          </div>
        )}

        {/* SERVICES */}
        {activeTab === "services" && (
          <Card title="Services">
            {(provider.skills || []).map((s, i) => (
              <span key={i} style={styles.tag}>{s}</span>
            ))}
          </Card>
        )}

        {/* BOOKINGS */}
        {activeTab === "bookings" && (
          <Card title="Bookings">
            <p>No bookings yet (backend ready)</p>
          </Card>
        )}

        {/* EARNINGS */}
        {activeTab === "earnings" && (
          <Card title="Earnings">
            <h2>UGX 0</h2>
            <p>Wallet integration coming soon</p>
          </Card>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <Card title="Reviews">
            <p>No reviews yet</p>
          </Card>
        )}
      </div>

      {/* ================= CONTACT MODAL ================= */}
      {showContact && (
        <div style={styles.modal}>
          <div style={styles.modalBox}>
            <h3>Contact Provider</h3>

            <button onClick={openWhatsApp} style={styles.modalBtn}>
              WhatsApp
            </button>

            <button onClick={openSMS} style={styles.modalBtn}>
              SMS
            </button>

            <button onClick={openMeet} style={styles.modalBtn}>
              Google Meet
            </button>

            <button onClick={openZoom} style={styles.modalBtn}>
              Zoom
            </button>

            <button onClick={() => setShowContact(false)} style={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

/* ================= CARD ================= */
function Card({ title, children }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: { background: "#f4f6fb", minHeight: "100vh" },

  hero: {
    height: 320,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#222",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
  },

  profileBox: {
    position: "relative",
    textAlign: "center",
    color: "#fff",
    zIndex: 2,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: "50%",
    border: "3px solid #fff",
  },

  progressBar: {
    width: 200,
    height: 6,
    background: "#ddd",
    margin: "10px auto",
  },

  progressFill: {
    height: "100%",
    background: "#00c853",
  },

  actions: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    marginTop: 10,
  },

  btn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: 6,
  },

  btnGreen: {
    padding: "8px 12px",
    background: "#00c853",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },

  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },

  tabBtn: {
    padding: "8px 14px",
    border: "1px solid #ddd",
    cursor: "pointer",
  },

  content: {
    padding: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 15,
  },

  card: {
    background: "#fff",
    padding: 15,
    borderRadius: 10,
  },

  tag: {
    display: "inline-block",
    background: "#667eea",
    color: "#fff",
    padding: "5px 10px",
    margin: 5,
    borderRadius: 20,
  },

  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },

  modalBtn: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    background: "#667eea",
    color: "#fff",
    border: "none",
  },

  closeBtn: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    background: "red",
    color: "#fff",
    border: "none",
  },
};

const page = { background: "#f4f6fb", minHeight: "100vh" };

const hero = {
  height: 320,
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const overlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
};

const glass = {
  position: "relative",
  padding: 20,
  background: "rgba(255,255,255,0.15)",
  borderRadius: 20,
  color: "#fff",
};

const avatar = { width: 120, height: 120, borderRadius: "50%" };

const verified = { color: "lime" };

const progressBox = { height: 6, background: "#ddd" };

const progressFill = { height: "100%", background: "green" };

const actionRow = { display: "flex", gap: 10 };

const editBtn = { background: "#fff", padding: 8 };

const hireBtn = { background: "green", color: "#fff", padding: 8 };

const messageBtn = {
  background: "transparent",
  border: "1px solid #fff",
  color: "#fff",
  padding: 8,
};

const coverUpload = {
  position: "absolute",
  right: 10,
  top: 10,
  background: "#fff",
  padding: 5,
};

const defaultImg = "https://via.placeholder.com/150";

const defaultCover =
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7";

/* MODAL */
const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalBox = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  width: 300,
};

const modalBtn = {
  width: "100%",
  marginTop: 10,
  padding: 10,
  background: "#667eea",
  color: "#fff",
  border: "none",
};

/* CHAT */
const chatOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const chatBox = {
  width: 350,
  height: 500,
  background: "#fff",
  borderRadius: 15,
  display: "flex",
  flexDirection: "column",
};

const chatHeader = {
  padding: 10,
  background: "#667eea",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
};

const chatBody = {
  flex: 1,
  padding: 10,
  overflowY: "auto",
};

const chatMsg = {
  padding: 8,
  borderRadius: 10,
  marginBottom: 8,
  maxWidth: "75%",
};

const chatInputBox = {
  display: "flex",
  padding: 10,
  borderTop: "1px solid #ddd",
};

const chatInput = {
  flex: 1,
  padding: 8,
};

const chatSend = {
  marginLeft: 8,
  background: "#667eea",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
};