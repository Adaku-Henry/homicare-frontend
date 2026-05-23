import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../features/profile/context/ProfileContext";

export default function EditProfile() {
  const navigate = useNavigate();
  const { updateProfile } = useProfileContext();

  const defaultForm = {
    name: "",
    email: "",
    phone: "",
    service: "",
    bio: "",
    location: "",
    skills: [],
    experience: [],
    education: [],
    pricePerHour: "",
    available: true,
    avatar: "",
  };

  const [form, setForm] = useState(defaultForm);
  const [preview, setPreview] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [expInput, setExpInput] = useState("");
  const [eduInput, setEduInput] = useState("");

  // ================= SAFE STORAGE =================
  const saveToStorage = (data) => {
    try {
      const { avatar, ...lightData } = data;
      localStorage.setItem("providerProfile", JSON.stringify(lightData));
    } catch (e) {
      console.warn("Storage error:", e);
      localStorage.removeItem("providerProfile");
    }
  };

  // ================= LOAD =================
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("providerProfile"));
      if (saved) {
        setForm({
          ...defaultForm,
          ...saved,
          skills: saved.skills || [],
          experience: saved.experience || [],
          education: saved.education || [],
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // ================= AUTO SAVE =================
  useEffect(() => {
    const timer = setTimeout(() => {
      updateProfile(form);
      saveToStorage(form);
    }, 700);

    return () => clearTimeout(timer);
  }, [form]);

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ================= IMAGE =================
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      alert("Image too large (max 500KB)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // ================= ADD =================
  const addItem = (field, value, setter) => {
    if (!value.trim()) return;
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], value],
    }));
    setter("");
  };

  // ================= REMOVE =================
  const removeItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // ================= NAV =================
  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.name || form.email) {
        navigate("/provider/profile");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [form.name, form.email]);

  // ================= UI =================
  return (
    <div style={container}>
      <h1>Professional Profile Builder</h1>

      <form style={card} onSubmit={(e) => e.preventDefault()}>

        {/* IMAGE */}
        <div style={imageSection}>
          <img src={preview || defaultImg} alt="Profile" style={avatarStyle} />
          <input type="file" onChange={handleImage} />
        </div>

        {/* BASIC */}
        <div style={grid}>
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Email" name="email" value={form.email} onChange={handleChange} />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <Input label="Service" name="service" value={form.service} onChange={handleChange} />
          <Input label="Location" name="location" value={form.location} onChange={handleChange} />
          <Input label="Price/Hour" name="pricePerHour" value={form.pricePerHour} onChange={handleChange} />
        </div>

        {/* BIO */}
        <Section title="Professional Summary">
          <textarea name="bio" value={form.bio} onChange={handleChange} style={textarea} />
        </Section>

        {/* SKILLS */}
        <Section title="Skills">
          <div style={row}>
            <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} style={inputStyle} />
            <button type="button" onClick={() => addItem("skills", skillInput, setSkillInput)}>Add</button>
          </div>
          {form.skills.map((s, i) => (
            <Tag key={i} text={s} onRemove={() => removeItem("skills", i)} />
          ))}
        </Section>

        {/* EXPERIENCE */}
        <Section title="Experience">
          <div style={row}>
            <input value={expInput} onChange={(e) => setExpInput(e.target.value)} style={inputStyle} />
            <button type="button" onClick={() => addItem("experience", expInput, setExpInput)}>Add</button>
          </div>
          {form.experience.map((e, i) => (
            <Tag key={i} text={e} onRemove={() => removeItem("experience", i)} />
          ))}
        </Section>

        {/* EDUCATION */}
        <Section title="Education">
          <div style={row}>
            <input value={eduInput} onChange={(e) => setEduInput(e.target.value)} style={inputStyle} />
            <button type="button" onClick={() => addItem("education", eduInput, setEduInput)}>Add</button>
          </div>
          {form.education.map((e, i) => (
            <Tag key={i} text={e} onRemove={() => removeItem("education", i)} />
          ))}
        </Section>

      </form>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input name={name} value={value} onChange={onChange} style={inputStyle} />
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

function Tag({ text, onRemove }) {
  return (
    <span style={chip}>
      {text} <button onClick={onRemove}>x</button>
    </span>
  );
}

/* ================= STYLES ================= */

const container = { padding: 20, background: "#f4f6fb" };
const card = { background: "#fff", padding: 20, borderRadius: 10 };
const grid = { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 };
const imageSection = { display: "flex", gap: 20, alignItems: "center" };
const avatarStyle = { width: 100, height: 100, borderRadius: "50%" };
const section = { marginTop: 20 };
const row = { display: "flex", gap: 10 };
const inputStyle = { padding: 10, width: "100%" };
const textarea = { width: "100%", minHeight: 100 };
const chip = { background: "#eee", padding: "5px 10px", margin: 5, borderRadius: 20 };
const defaultImg = "https://via.placeholder.com/100";