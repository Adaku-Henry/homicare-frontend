// src/features/profile/context/ProfileContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";

// ✅ FIXED PATH
import { useAuth } from "../../../context/AuthContext";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= LOAD PROFILE =================
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const saved = localStorage.getItem(`profile_${user.id}`);

      if (saved) {
        setProfile(JSON.parse(saved));
      } else {
        // ✅ default profile from user
        const defaultProfile = {
          ...user,
          bio: "",
          location: "",
          avatar: "",
        };

        localStorage.setItem(
          `profile_${user.id}`,
          JSON.stringify(defaultProfile)
        );

        setProfile(defaultProfile);
      }
    } catch (err) {
      console.error("Profile load error:", err);
      setProfile(user);
    }

    setLoading(false);
  }, [user]);

  // ================= UPDATE PROFILE =================
  const updateProfile = (data) => {
    if (!user) return;

    setProfile((prev) => {
      const updated = { ...prev, ...data };

      localStorage.setItem(
        `profile_${user.id}`,
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
        loading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);