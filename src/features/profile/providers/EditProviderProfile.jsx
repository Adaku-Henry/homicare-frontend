import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

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

/* =========================
   MAIN COMPONENT
========================= */
export default function ProEditProfile() {
  const navigate = useNavigate();
  const { updateProfile } = useProfileContext();

  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const autoSaveRef = useRef(null);

  /* =========================
     INIT LOAD (DRAFT SAFE)
  ========================= */
  useEffect(() => {
    const draft = JSON.parse(
      localStorage.getItem("pro_profile_draft") || "{}"
    );

    const merged = {
      ...defaultProfile,
      ...draft,
    };

    setProfile(merged);
  }, []);

  /* =========================
     AUTO SAVE (DEBOUNCED)
  ========================= */
  useEffect(() => {
    clearTimeout(autoSaveRef.current);

    autoSaveRef.current = setTimeout(() => {
      localStorage.setItem(
        "pro_profile_draft",
        JSON.stringify(profile)
      );
      setDirty(true);
    }, 1000);

    return () => clearTimeout(autoSaveRef.current);
  }, [profile]);

  /* =========================
     FORM UPDATE SAFE HANDLER
  ========================= */
  const updateField = useCallback((key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  /* =========================
     PORTFOLIO UPLOAD (SAFE)
  ========================= */
  const handlePortfolioUpload = (e) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setProfile((prev) => ({
          ...prev,
          portfolio: [...prev.portfolio, reader.result],
        }));
      };

      reader.readAsDataURL(file);
    });
  };

  /* =========================
     AVAILABILITY TOGGLE
  ========================= */
  const toggleDay = useCallback((day) => {
    setProfile((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: !prev.availability[day],
      },
    }));
  }, []);

  /* =========================
     AI BIO GENERATOR (MOCK)
  ========================= */
  const generateBio = useCallback(() => {
    const bio = `Experienced ${
      profile.service || "professional"
    } delivering reliable, high-quality services with customer satisfaction focus.`;

    updateField("bio", bio);
  }, [profile.service, updateField]);

  /* =========================
     DYNAMIC PRICING ENGINE (REALISTIC)
  ========================= */
  const dynamicPrice = useMemo(() => {
    const base = Number(profile.pricePerHour || 0);
    const emergency = Number(profile.emergencyRate || 0);
    const weekend = Number(profile.weekendRate || 0);

    let multiplier = 1;

    if (profile.verified) multiplier += 0.25;
    if (profile.skills?.length > 3) multiplier += 0.1;
    if (profile.experience?.length > 2) multiplier += 0.15;

    return Math.round(base * multiplier + emergency + weekend);
  }, [
    profile.pricePerHour,
    profile.emergencyRate,
    profile.weekendRate,
    profile.verified,
    profile.skills,
    profile.experience,
  ]);

  /* =========================
     VALIDATION ENGINE
  ========================= */
  const isValid = useMemo(() => {
    return (
      profile.name.trim().length > 2 &&
      profile.email.includes("@") &&
      profile.phone.trim().length > 6
    );
  }, [profile]);

  /* =========================
     SAVE PROFILE (PRODUCTION SAFE)
  ========================= */
  const handleSubmit = async () => {
    if (!isValid) {
      alert("Please fill required fields correctly");
      return;
    }

    setSaving(true);

    try {
      await updateProfile(profile);

      localStorage.removeItem("pro_profile_draft");

      setDirty(false);

      setTimeout(() => {
        navigate("/provider/profile");
      }, 600);
    } catch (err) {
      console.error("Save failed", err);
    }

    setSaving(false);
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="proEditWrapper">

      {/* HEADER */}
      <div className="proHeader">
        <h1>🚀 Pro Profile Builder</h1>

        <div className="statusBar">
          <span>{dirty ? "Draft Saved" : "Not Saved"}</span>
          <span>💰 Estimated: UGX {dynamicPrice}</span>
        </div>
      </div>

      {/* MEDIA */}
      <section className="card">
        <h2>Media Upload</h2>

        <input type="file" multiple onChange={handlePortfolioUpload} />
      </section>

      {/* BIO */}
      <section className="card">
        <h2>AI Bio</h2>

        <textarea
          value={profile.bio}
          onChange={(e) => updateField("bio", e.target.value)}
        />

        <button onClick={generateBio}>
          Generate AI Bio
        </button>
      </section>

      {/* BASIC INFO */}
      <section className="card">
        <h2>Basic Info</h2>

        <input
          placeholder="Name"
          value={profile.name}
          onChange={(e) => updateField("name", e.target.value)}
        />

        <input
          placeholder="Email"
          value={profile.email}
          onChange={(e) => updateField("email", e.target.value)}
        />

        <input
          placeholder="Phone"
          value={profile.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />
      </section>

      {/* AVAILABILITY */}
      <section className="card">
        <h2>Availability</h2>

        {Object.keys(profile.availability).map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              checked={profile.availability[day]}
              onChange={() => toggleDay(day)}
            />
            {day.toUpperCase()}
          </label>
        ))}
      </section>

      {/* ACTIONS */}
      <div className="actions">
        <button onClick={handleSubmit} disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}