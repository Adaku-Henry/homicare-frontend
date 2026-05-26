import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../context/ProfileContext";

const defaultForm = {
  fullName: "",
  username: "",
  email: "",
  phone: "",
  city: "",
  address: "",
  rate: "",
  availability: "",
  bio: "",
  skills: [],
  experience: "",
  connections: "",
  avatar: "",
  coverPhoto: "",
  website: "",
  facebook: "",
  twitter: "",
  instagram: "",
  linkedin: "",
  gender: "",
  role: "",
  education: "",
  language: "",
  portfolio: [],
  certificates: [],
  services: [],
};

const EditProfile = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useProfileContext();

  const [form, setForm] = useState(defaultForm);
  const [preview, setPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [skillInput, setSkillInput] = useState("");
  const [profileStrength, setProfileStrength] = useState(0);

  const autoSaveRef = useRef(null);

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const draft = JSON.parse(
      localStorage.getItem("providerProfileDraft") || "{}"
    );

    const merged = {
      ...defaultForm,
      ...profile,
      ...draft,
    };

    setForm(merged);
    setPreview(merged.avatar || "");
    setCoverPreview(merged.coverPhoto || "");
  }, [profile]);

  /* ================= PROFILE STRENGTH ================= */
  useEffect(() => {
    let filled = 0;
    const values = Object.values(form);

    values.forEach((v) => {
      if (Array.isArray(v)) {
        if (v.length > 0) filled++;
      } else if (v) {
        filled++;
      }
    });

    setProfileStrength(
      Math.floor((filled / values.length) * 100)
    );
  }, [form]);

  /* ================= AUTOSAVE ================= */
  useEffect(() => {
    clearTimeout(autoSaveRef.current);

    autoSaveRef.current = setTimeout(() => {
      localStorage.setItem(
        "providerProfileDraft",
        JSON.stringify(form)
      );

      setUnsavedChanges(true);
    }, 1200);

    return () => clearTimeout(autoSaveRef.current);
  }, [form]);

  /* ================= BLOCK EXIT ================= */
  useEffect(() => {
    const handler = (e) => {
      if (!unsavedChanges) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () =>
      window.removeEventListener("beforeunload", handler);
  }, [unsavedChanges]);

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setUnsavedChanges(true);
  };

  /* ================= AVATAR ================= */
  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreview(url);
    setForm((p) => ({ ...p, avatar: url }));
    setUnsavedChanges(true);
  };

  /* ================= COVER ================= */
  const handleCover = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setCoverPreview(url);
    setForm((p) => ({ ...p, coverPhoto: url }));
    setUnsavedChanges(true);
  };

  /* ================= SAVE ================= */
  const saveProfile = async () => {
    setSaving(true);

    try {
      await updateProfile(form);

      localStorage.setItem("providerProfile", JSON.stringify(form));
      localStorage.removeItem("providerProfileDraft");

      setSaved(true);
      setUnsavedChanges(false);

      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error(err);
    }

    setSaving(false);
  };

  /* ================= SKILLS ================= */
  const addSkill = () => {
    if (!skillInput.trim()) return;

    setForm((p) => ({
      ...p,
      skills: [...(p.skills || []), skillInput],
    }));

    setSkillInput("");
    setUnsavedChanges(true);
  };

  const removeSkill = (skill) => {
    setForm((p) => ({
      ...p,
      skills: p.skills.filter((s) => s !== skill),
    }));
  };

  /* ================= NAVIGATE SAFELY ================= */
  const goToProfile = () => {
    if (unsavedChanges) {
      const ok = window.confirm("You have unsaved changes. Leave?");
      if (!ok) return;
    }

    navigate("/provider/profile");
  };

  return (
    <div className="editProfileWrapper">

      {/* COVER */}
      <div className="editCoverSection">
        <img
          src={coverPreview || "https://images.unsplash.com/photo-1497366754035-f200968a6e72"}
          alt="cover"
          className="editCoverImage"
        />
        <input type="file" onChange={handleCover} />
      </div>

      {/* HEADER */}
      <div className="editHeaderCard">
        <img
          src={preview || "https://i.pravatar.cc/200"}
          alt="avatar"
          className="editAvatar"
        />

        <input type="file" onChange={handleAvatar} />

        <div>
          Profile Strength: {profileStrength}%
        </div>
      </div>

      {/* ACTIONS */}
      <div className="actionBar">

        <button onClick={saveProfile} disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </button>

        <button onClick={goToProfile}>
          Open Profile
        </button>

      </div>

      {/* WARNINGS */}
      {unsavedChanges && (
        <div className="warning">⚠ Unsaved changes</div>
      )}

      {saved && (
        <div className="success">✔ Saved successfully</div>
      )}

      {/* FORM */}
      <div className="formGrid">
        <input name="fullName" value={form.fullName} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="phone" value={form.phone} onChange={handleChange} />
      </div>

      {/* SKILLS */}
      <div>
        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Add skill"
        />

        <button onClick={addSkill}>Add Skill</button>

        {form.skills?.map((s, i) => (
          <span key={i} onClick={() => removeSkill(s)}>
            {s} ✕
          </span>
        ))}
      </div>

    </div>
  );
};

export default EditProfile;