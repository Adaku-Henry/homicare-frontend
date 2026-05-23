import React, { useState, useEffect } from "react";
import { useProfileContext } from "../context/ProfileContext";
import { useNavigate } from "react-router-dom";

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
  skills: "",
  experience: "",
  connections: "",
  avatar: ""
};

const EditProfile = () => {
  const { profile, updateProfile } = useProfileContext();
  const navigate = useNavigate();

  const [form, setForm] = useState(defaultForm);
  const [preview, setPreview] = useState("");
  const [cvFile, setCvFile] = useState(null); // ✅ NEW

  /* =============================
     INIT PROFILE SYNC
  ==============================*/
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("providerProfile"));

    if (saved || profile) {
      const merged = { ...defaultForm, ...saved, ...profile };

      setForm(merged);
      setPreview(merged.avatar || "");
    }
  }, [profile]);

  /* =============================
     AUTO SAVE ENGINE
  ==============================*/
  useEffect(() => {
    const delay = setTimeout(() => {
      updateProfile(form);
      localStorage.setItem("providerProfile", JSON.stringify(form));
    }, 800);

    return () => clearTimeout(delay);
  }, [form]);

  /* =============================
     HANDLE INPUTS
  ==============================*/
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  /* =============================
     IMAGE HANDLING
  ==============================*/
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setForm((prev) => ({
        ...prev,
        avatar: imageUrl
      }));

      setPreview(imageUrl);
    }
  };

  /* =============================
     🔥 CV AUTO-FILL (SMART MOCK)
  ==============================*/
  const handleCVUpload = async () => {
    if (!cvFile) return alert("Upload CV first");

    // 🔥 MOCK AI PARSER (replace with backend later)
    const fakeData = {
      fullName: "Adaku Henry",
      email: "adaku@email.com",
      phone: "+256700000000",
      skills: "Cleaning, Plumbing, Electrical",
      experience: "3+ years working with home services and client management",
      bio: "Experienced service provider dedicated to quality work"
    };

    // ✅ AUTO-FILL FORM
    setForm((prev) => ({
      ...prev,
      ...fakeData
    }));
  };

  /* =============================
     NAVIGATION
  ==============================*/
  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.fullName || form.email) {
        navigate("/provider/profile");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [form.fullName, form.email]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow space-y-4">

      <h2 className="text-2xl font-bold">Edit Profile</h2>

      <p className="text-gray-500 text-sm">
        ✨ Your profile updates automatically as you type
      </p>

      {/* 🔥 CV UPLOAD SECTION */}
      <div className="border p-4 rounded bg-gray-50">
        <label className="block font-medium mb-2">
          Upload CV (Auto-fill profile)
        </label>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setCvFile(e.target.files[0])}
        />

        <button
          onClick={handleCVUpload}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Auto Fill From CV
        </button>
      </div>

      {/* PROFILE IMAGE */}
      <div>
        <label className="block font-medium">Profile Picture</label>

        <input type="file" onChange={handleImage} />

        {preview && (
          <img
            src={preview}
            alt="Profile preview"
            className="w-20 h-20 rounded-full mt-2 object-cover border"
          />
        )}
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-2 gap-4">

        <input name="fullName" value={form.fullName || ""} onChange={handleChange} placeholder="Full Name" className="input" />
        <input name="username" value={form.username || ""} onChange={handleChange} placeholder="Username" className="input" />
        <input name="email" value={form.email || ""} onChange={handleChange} placeholder="Email" className="input" />
        <input name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Phone" className="input" />
        <input name="city" value={form.city || ""} onChange={handleChange} placeholder="City" className="input" />
        <input name="address" value={form.address || ""} onChange={handleChange} placeholder="Address" className="input" />
        <input name="rate" value={form.rate || ""} onChange={handleChange} placeholder="Rate (UGX)" className="input" />
        <input name="availability" value={form.availability || ""} onChange={handleChange} placeholder="Availability" className="input" />

      </div>

      <textarea name="bio" value={form.bio || ""} onChange={handleChange} placeholder="About you" className="input w-full" />

      <input name="skills" value={form.skills || ""} onChange={handleChange} placeholder="Skills (comma separated)" className="input w-full" />

      <textarea name="experience" value={form.experience || ""} onChange={handleChange} placeholder="Experience" className="input w-full" />

      <input name="connections" value={form.connections || ""} onChange={handleChange} placeholder="Connections" className="input w-full" />

      <div className="text-green-500 text-sm">
        ✔ Profile is syncing automatically in real-time
      </div>

    </div>
  );
};

export default EditProfile;