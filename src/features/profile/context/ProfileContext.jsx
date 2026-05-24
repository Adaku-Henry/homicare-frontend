import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();
export const useProfileContext = () => useContext(ProfileContext);

const defaultProfile = {
  fullName: "",
  email: "",
  phone: "",
  avatar: "",
  bio: "",
  skills: [],
  experience: "",
  rate: "",
  city: "",
  address: "",
  availability: "",
  connections: "",
};

export const ProfileProvider = ({ children }) => {
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState(defaultProfile);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setProfile(defaultProfile);
      setLoadingProfile(false);
      return;
    }

    const key = `homicare_profile_${user.id}`;
    const saved = localStorage.getItem(key);

    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      setProfile({
        ...defaultProfile,
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }

    setLoadingProfile(false);
  }, [user, loading]);

  useEffect(() => {
    if (!user) return;

    const key = `homicare_profile_${user.id}`;
    localStorage.setItem(key, JSON.stringify(profile));
  }, [profile, user]);

  const updateProfile = (data) => {
    setProfile((prev) => ({ ...prev, ...data }));
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