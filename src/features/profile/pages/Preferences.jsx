import { useState, useEffect } from "react";

const Preferences = () => {

  /* ================= STATE ================= */
  const [preferences, setPreferences] = useState({
    language: "English",
    theme: "Light",
    notifications: true,
    emailUpdates: false,
    smsAlerts: true,
    locationAccess: true,
    autoAcceptJobs: false,
    accessibility: {
      largeText: false,
      highContrast: false,
    }
  });

  const [savedMessage, setSavedMessage] = useState("");

  /* ================= LOAD SAVED ================= */
  useEffect(() => {
    const saved = localStorage.getItem("preferences");
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  /* ================= SAVE ================= */
  const savePreferences = () => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
    setSavedMessage("✅ Preferences saved successfully!");

    setTimeout(() => setSavedMessage(""), 3000);
  };

  /* ================= HANDLE CHANGE ================= */
  const update = (key, value) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const updateNested = (section, key, value) => {
    setPreferences({
      ...preferences,
      [section]: {
        ...preferences[section],
        [key]: value
      }
    });
  };

  /* ================= APPLY THEME ================= */
  useEffect(() => {
    document.body.style.background =
      preferences.theme === "Dark"
        ? "#020617"
        : preferences.theme === "Light"
        ? "#f1f5f9"
        : "#0f172a";
  }, [preferences.theme]);

  /* ================= LANGUAGE OPTIONS ================= */
  const languages = [
    "English",
    "French",
    "Spanish",
    "German",
    "Arabic",
    "Chinese",
    "Hindi",

    // African + Local
    "Swahili",
    "Luganda",
    "Runyankole",
    "Acholi",
    "Ateso",
    "Lusoga",
    "Kinyarwanda",
    "Lingala"
  ];

  /* ================= UI ================= */
  return (
    <div style={container}>

      <div style={card}>

        <h2 style={title}>⚙️ Preferences</h2>

        {/* ===== LANGUAGE ===== */}
        <Section title="🌍 Language">
          <select
            value={preferences.language}
            onChange={(e) => update("language", e.target.value)}
            style={input}
          >
            {languages.map((lang, i) => (
              <option key={i}>{lang}</option>
            ))}
          </select>
        </Section>

        {/* ===== THEME ===== */}
        <Section title="🎨 Theme">
          <div style={optionRow}>
            {["Light", "Dark", "System"].map((t) => (
              <button
                key={t}
                style={{
                  ...themeBtn,
                  background:
                    preferences.theme === t
                      ? "linear-gradient(135deg,#3b82f6,#06b6d4)"
                      : "#1e293b"
                }}
                onClick={() => update("theme", t)}
              >
                {t}
              </button>
            ))}
          </div>
        </Section>

        {/* ===== NOTIFICATIONS ===== */}
        <Section title="🔔 Notifications">
          <Toggle
            label="Enable Notifications"
            value={preferences.notifications}
            onChange={(v) => update("notifications", v)}
          />
          <Toggle
            label="Email Updates"
            value={preferences.emailUpdates}
            onChange={(v) => update("emailUpdates", v)}
          />
          <Toggle
            label="SMS Alerts"
            value={preferences.smsAlerts}
            onChange={(v) => update("smsAlerts", v)}
          />
        </Section>

        {/* ===== PRIVACY ===== */}
        <Section title="🔐 Privacy">
          <Toggle
            label="Allow Location Access"
            value={preferences.locationAccess}
            onChange={(v) => update("locationAccess", v)}
          />
          <Toggle
            label="Auto Accept Jobs"
            value={preferences.autoAcceptJobs}
            onChange={(v) => update("autoAcceptJobs", v)}
          />
        </Section>

        {/* ===== ACCESSIBILITY ===== */}
        <Section title="♿ Accessibility">
          <Toggle
            label="Large Text"
            value={preferences.accessibility.largeText}
            onChange={(v) =>
              updateNested("accessibility", "largeText", v)
            }
          />
          <Toggle
            label="High Contrast"
            value={preferences.accessibility.highContrast}
            onChange={(v) =>
              updateNested("accessibility", "highContrast", v)
            }
          />
        </Section>

        {/* ===== LIVE PREVIEW ===== */}
        <Section title="👁 Live Preview">
          <div style={preview}>
            <p>Language: {preferences.language}</p>
            <p>Theme: {preferences.theme}</p>
            <p>
              Notifications:{" "}
              {preferences.notifications ? "On" : "Off"}
            </p>
          </div>
        </Section>

        {/* ===== SAVE BUTTON ===== */}
        <button style={saveBtn} onClick={savePreferences}>
          💾 Save Preferences
        </button>

        {/* ===== FEEDBACK ===== */}
        {savedMessage && (
          <p style={{ marginTop: 10, color: "#22c55e" }}>
            {savedMessage}
          </p>
        )}

      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const Section = ({ title, children }) => (
  <div style={section}>
    <h3 style={sectionTitle}>{title}</h3>
    {children}
  </div>
);

const Toggle = ({ label, value, onChange }) => (
  <div style={toggleRow}>
    <span>{label}</span>
    <div
      onClick={() => onChange(!value)}
      style={{
        ...toggle,
        background: value ? "#22c55e" : "#475569"
      }}
    >
      <div
        style={{
          ...toggleCircle,
          transform: value ? "translateX(20px)" : "translateX(0)"
        }}
      />
    </div>
  </div>
);

/* ================= STYLES ================= */

const container = {
  padding: 20,
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f172a,#020617)",
  display: "flex",
  justifyContent: "center",
};

const card = {
  width: "100%",
  maxWidth: 600,
  padding: 20,
  borderRadius: 16,
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  color: "white",
};

const title = {
  fontSize: 22,
  marginBottom: 20,
};

const section = {
  marginBottom: 20,
};

const sectionTitle = {
  marginBottom: 10,
  fontSize: 16,
};

const input = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "none",
  background: "#1e293b",
  color: "white",
};

const optionRow = {
  display: "flex",
  gap: 10,
};

const themeBtn = {
  flex: 1,
  padding: 10,
  borderRadius: 8,
  border: "none",
  color: "white",
  cursor: "pointer",
};

const toggleRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,
};

const toggle = {
  width: 40,
  height: 20,
  borderRadius: 20,
  position: "relative",
  cursor: "pointer",
};

const toggleCircle = {
  width: 18,
  height: 18,
  borderRadius: "50%",
  background: "white",
  position: "absolute",
  top: 1,
  left: 1,
  transition: "0.3s",
};

const preview = {
  padding: 10,
  background: "#1e293b",
  borderRadius: 8,
};

const saveBtn = {
  width: "100%",
  padding: 12,
  background: "linear-gradient(135deg,#3b82f6,#06b6d4)",
  border: "none",
  borderRadius: 10,
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Preferences;