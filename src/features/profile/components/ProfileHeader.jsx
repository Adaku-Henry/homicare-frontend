import React from "react";

function ProfileHeader({ profile }) {
  return (
    <div className="profile-header">
      <div className="banner"></div>

      <div className="profile-info">
        <img
          src={profile.avatar || "/default-avatar.png"}
          alt="avatar"
          className="avatar"
        />

        <h2>{profile.fullName}</h2>
        <p>{profile.headline}</p>
        <p>{profile.location}</p>
      </div>
    </div>
  );
}

export default ProfileHeader;