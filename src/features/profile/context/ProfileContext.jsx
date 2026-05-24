import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const ProfileContext = createContext();

// ✅ single clean hook
export const useProfileContext = () => useContext(ProfileContext);

const defaultProfile = {
  fullName: "",
  email: "",
  phone: "",
  avatar: "",
  bio: "",
  location: "",
  address: "",
  city: "",
  skills: [],
  experience: "",
  rate: "",
  availability: "",
  connections: "",
};

export const ProfileProvider = ({ children }) => {
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState(defaultProfile);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // ================= LOAD PROFILE =================
  useEffect(() => {
    if (loading) return;

    if (!user) {
      setProfile(defaultProfile);
      setLoadingProfile(false);
      return;
    }

    try {
      const key = `homicare_profile_${user.id}`;
      const saved = localStorage.getItem(key);

      if (saved) {
        setProfile(JSON.parse(saved));
      } else {
        const initialProfile = {
          ...defaultProfile,
          fullName: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        };

        localStorage.setItem(key, JSON.stringify(initialProfile));
        setProfile(initialProfile);
      }
    } catch (err) {
      console.error("Profile load error:", err);
      setProfile(defaultProfile);
    }

    setLoadingProfile(false);
  }, [user, loading]);

  // ================= UPDATE PROFILE =================
  const updateProfile = (data) => {
    if (!user) return;

    setProfile((prev) => {
      const updated = { ...prev, ...data };

      localStorage.setItem(
        `homicare_profile_${user.id}`,
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        loading: loadingProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};