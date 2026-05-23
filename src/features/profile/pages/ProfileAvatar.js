import React from "react";
import { useProfileContext } from "../../../context/ProfileContext";

const ProfileAvatar = () => {
  const { profile } = useProfileContext();

  return (
    <div className="flex flex-col items-center">

      <img
        src={
          profile.avatar ||
          "https://via.placeholder.com/100"
        }
        alt="profile"
        className="w-24 h-24 rounded-full object-cover border"
      />

      <p className="mt-2 text-sm text-gray-500">
        {profile.name}
      </p>

    </div>
  );
};

export default ProfileAvatar;