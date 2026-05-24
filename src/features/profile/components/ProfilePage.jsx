import React from "react";
import { useProfileContext } from "../context/ProfileContext";

function ProviderProfile() {
  const { profile, loading } = useProfileContext();

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="provider-profile">

      {/* HEADER */}
      <div className="profile-header">

        <img
          src={profile.avatar || "https://i.pravatar.cc/150"}
          alt="profile"
          className="profile-avatar"
        />

        <h2>{profile.name || "No Name Added"}</h2>

        <p>
          {Array.isArray(profile.experience) && profile.experience.length > 0
            ? profile.experience.join(", ")
            : "No experience added"}
        </p>

        <p>⭐ {profile.rating ?? 0}</p>
      </div>

      {/* ABOUT */}
      <div className="provider-section">
        <h4>About</h4>
        <p>{profile.bio || "No bio added yet"}</p>
      </div>

      {/* SKILLS */}
      <div className="provider-section">
        <h4>Skills</h4>

        <p>
          {Array.isArray(profile.skills) && profile.skills.length > 0
            ? profile.skills.join(", ")
            : "No skills added yet"}
        </p>
      </div>

    </div>
  );
}

export default ProviderProfile;