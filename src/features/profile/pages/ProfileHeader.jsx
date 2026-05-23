import React from "react";
import { useProfileContext } from "../context/ProfileContext";

const ProfileHeader = () => {
  const { profile, loading } = useProfileContext();

  // 🛑 WAIT until profile is ready
  if (loading) {
    return <p>Loading profile...</p>;
  }

  // 🛑 FALLBACK if profile missing
  if (!profile) {
    return <p>No profile data</p>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">

      <div className="flex items-center gap-3">
        {/* ✅ SAFE AVATAR */}
        <img
          src={profile.avatar || "https://i.pravatar.cc/100"}
          alt="profile"
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h1 className="text-xl font-bold">
            {profile.fullName || "User"}
          </h1>

          <p className="text-sm text-gray-500">
            {profile.email || "No email"}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-500">Wallet Balance</p>
        <h2 className="font-bold text-green-600">
          UGX {profile.wallet || 0}
        </h2>
      </div>

    </div>
  );
};

export default ProfileHeader;