import React, { useState } from "react";
import { useProfileContext } from "../context/ProfileContext";
import "./ProviderProfile.css";

const ProviderProfilePage = () => {
  const { profile, loading } = useProfileContext();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    details: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    alert("Booking sent successfully 🚀");
    setForm({ name: "", phone: "", details: "" });
  };

  // ✅ Loading state
  if (loading) {
    return <p>Loading profile...</p>;
  }

  // ✅ No profile fallback
  if (!profile) {
    return <p>No profile data found</p>;
  }

  return (
    <div className="provider-profile">

      {/* ================= HEADER ================= */}
      <div className="profile-header">

        <img
          src={profile.avatar || "https://i.pravatar.cc/150"}
          alt="provider"
          className="profile-avatar"
        />

        <h2>{profile.fullName || "Provider Name"}</h2>

        <p className="text-gray-500">
          {profile.city || "No city added"}
        </p>

        <p>{profile.experience || "No experience added"}</p>

        <p>⭐ {profile.rate || "0"}</p>

        <p>{profile.availability || "Not available"}</p>
      </div>

      {/* ================= ABOUT ================= */}
      <div className="provider-section">
        <h4>About</h4>
        <p>{profile.bio || "No bio yet"}</p>
      </div>

      {/* ================= SKILLS ================= */}
      <div className="provider-section">
        <h4>Skills</h4>
        <p>{profile.skills || "No skills added"}</p>
      </div>

      {/* ================= EXPERIENCE ================= */}
      <div className="provider-section">
        <h4>Experience</h4>
        <p>{profile.experience || "No experience added"}</p>
      </div>

      {/* ================= CONTACT ================= */}
      <div className="provider-section">
        <h4>Contact</h4>
        <p>📞 {profile.phone || "No phone"}</p>
        <p>📧 {profile.email || "No email"}</p>
        <p>📍 {profile.address || "No address"}</p>
      </div>

      {/* ================= CONNECTIONS ================= */}
      <div className="provider-section">
        <h4>Connections</h4>

        {profile.connections ? (
          profile.connections.split(",").map((c, i) => (
            <p key={i} className="connection-item">
              • {c.trim()}
            </p>
          ))
        ) : (
          <p>No connections added</p>
        )}
      </div>

      {/* ================= BOOKING FORM ================= */}
      <div className="booking-form">
        <h4>Book This Provider</h4>

        <input
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Your Name"
        />

        <input
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          placeholder="Phone Number"
        />

        <textarea
          value={form.details}
          onChange={(e) =>
            setForm({ ...form, details: e.target.value })
          }
          placeholder="Booking Details"
        />

        <button onClick={handleSubmit}>
          Submit Booking
        </button>
      </div>

    </div>
  );
};

export default ProviderProfilePage;