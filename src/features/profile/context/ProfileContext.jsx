import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const ProfileContext = createContext();

const defaultProfile = {
  fullName: "",
  email: "",
  phone: "",
  avatar: "",
  bio: "",
  skills: "",
  experience: "",
  rate: "",
  city: "",
  address: "",
  availability: "",

  // 🔥 ADDED
  connections: "",
};

export const ProfileProvider = ({ children }) => {
  const { user, loading } = useAuth();

  const storageKey = user?.id ? `homicare_profile_${user.id}` : null;

  const [profile, setProfile] = useState(defaultProfile);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!user?.id) {
      setProfile(defaultProfile);
      setLoadingProfile(false);
      return;
    }

    const saved = localStorage.getItem(storageKey);

    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      setProfile({
        ...defaultProfile,
        fullName: user?.fullName || "",
        email: user?.email || "",
      });
    }

    setLoadingProfile(false);
  }, [user, loading, storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(profile));
  }, [profile, storageKey]);

  const updateProfile = (data) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, loading: loadingProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("ProfileContext must be used inside Provider");
  return ctx;
};