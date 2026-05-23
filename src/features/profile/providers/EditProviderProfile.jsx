import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../features/profile/context/ProfileContext";

/* =========================
   DEFAULT PROFILE MODEL
========================= */
const defaultProfile = {
  name: "",
  email: "",
  phone: "",
  role: "provider",
  verified: false,

  avatar: "",
  cover: "",

  location: "",
  serviceRadius: 10,

  service: "",
  bio: "",
  pricePerHour: 0,
  emergencyRate: 0,
  weekendRate: 0,

  skills: [],
  certifications: [],
  experience: [],
  education: [],

  availability: {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  },

  portfolio: [],

  notifications: true,
  instantBooking: true,
};

export default function ProEditProfile() {
  const navigate = useNavigate();
  const { updateProfile } = useProfileContext();

  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(false);

  const [skillInput, setSkillInput] = useState("");
  const [expInput, setExpInput] = useState("");
  const [eduInput, setEduInput] = useState("");

  /* =========================
     📸 PORTFOLIO UPLOADER
  ========================= */
  const handlePortfolioUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((p) => ({
          ...p,
          portfolio: [...p.portfolio, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  /* =========================
     📅 AVAILABILITY TOGGLE
  ========================= */
  const toggleDay = (day) => {
    setProfile((p) => ({
      ...p,
      availability: {
        ...p.availability,
        [day]: !p.availability[day],
      },
    }));
  };

  /* =========================
     🧠 AI BIO GENERATOR (MOCK)
  ========================= */
  const generateBio = () => {
    const bio = `I am a skilled ${profile.service || "professional"}
    with experience in delivering high-quality services.
    I focus on reliability, speed, and customer satisfaction.`;

    setProfile((p) => ({ ...p, bio }));
  };

  /* =========================
     💰 DYNAMIC PRICING ENGINE
  ========================= */
  const calculateDynamicPrice = () => {
    const base = Number(profile.pricePerHour || 0);
    const ratingBoost = profile.verified ? 1.2 : 1;
    const emergency = Number(profile.emergencyRate || 0);

    return Math.round(base * ratingBoost + emergency);
  };

  /* =========================
     ⭐ VERIFICATION DISPLAY
  ========================= */
  const VerificationBadge = () => (
    <div style={{ marginTop: 10 }}>
      {profile.verified ? (
        <span style={{ color: "green" }}>✔ Verified Provider</span>
      ) : (
        <span style={{ color: "gray" }}>Not Verified</span>
      )}
    </div>
  );

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = useCallback(() => {
    setLoading(true);

    updateProfile(profile);

    setTimeout(() => {
      setLoading(false);
      navigate("/provider/profile");
    }, 800);
  }, [profile, updateProfile, navigate]);

  /* =========================
     UI
  ========================= */
  return (
    <div style={styles.container}>
      <h1>⭐ PRO Profile Builder</h1>

      {/* ================= MEDIA ================= */}
      <div style={styles.card}>
        <h2>Media</h2>

        <img
          src={profile.avatar || "https://via.placeholder.com/100"}
          alt="avatar"
          style={styles.avatar}
        />

        <input type="file" multiple onChange={(e) => handlePortfolioUpload(e)} />
      </div>

      {/* ================= VERIFICATION ================= */}
      <div style={styles.card}>
        <h2>Verification</h2>
        <VerificationBadge />
      </div>

      {/* ================= BIO AI ================= */}
      <div style={styles.card}>
        <h2>AI Bio Builder</h2>

        <textarea
          value={profile.bio}
          onChange={(e) =>
            setProfile((p) => ({ ...p, bio: e.target.value }))
          }
        />

        <button onClick={generateBio}>
          🧠 Generate AI Bio
        </button>
      </div>

      {/* ================= AVAILABILITY CALENDAR ================= */}
      <div style={styles.card}>
        <h2>📅 Availability Calendar</h2>

        {Object.keys(profile.availability).map((day) => (
          <label key={day} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={profile.availability[day]}
              onChange={() => toggleDay(day)}
            />
            {day.toUpperCase()}
          </label>
        ))}
      </div>

      {/* ================= DYNAMIC PRICING ================= */}
      <div style={styles.card}>
        <h2>💰 Dynamic Pricing</h2>

        <p>
          Estimated Price:
          <strong> {calculateDynamicPrice()} UGX</strong>
        </p>
      </div>

      {/* ================= PORTFOLIO GRID ================= */}
      <div style={styles.card}>
        <h2>📸 Portfolio</h2>

        <input type="file" multiple onChange={handlePortfolioUpload} />

        <div style={styles.grid}>
          {profile.portfolio.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="portfolio"
              style={styles.portfolioImg}
            />
          ))}
        </div>
      </div>

      {/* ================= SAVE ================= */}
      <button onClick={handleSubmit} style={styles.button}>
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: { padding: 20 },
  card: {
    padding: 20,
    marginBottom: 20,
    border: "1px solid #ddd",
    borderRadius: 10,
  },
  avatar: { width: 100, height: 100, borderRadius: "50%" },
  button: {
    padding: 12,
    background: "black",
    color: "white",
    border: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
  },
  portfolioImg: {
    width: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: 8,
  },
};