import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../api/users";

export default function useUsers() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const update = async (data) => {
    await updateProfile(data);
    loadProfile();
  };

  return { profile, loadProfile, update };
}