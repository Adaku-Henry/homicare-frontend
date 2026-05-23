import { useEffect } from "react";
import { getProfile } from "../services/profileAPI";
import { useProfileContext } from "../context/ProfileContext";

export const useProfile = () => {
  const { profile, updateProfile } = useProfileContext();

  useEffect(() => {
    const load = async () => {
      const data = await getProfile();
      updateProfile(data);
    };
    load();
  }, []);

  return { profile, updateProfile };
};