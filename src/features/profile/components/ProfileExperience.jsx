import React from "react";

function ProfileExperience({ profile }) {
  return (
    <div className="card">
      <h3>Experience</h3>
      <p>{profile.experience || "No experience added yet"}</p>
    </div>
  );
}

export default ProfileExperience;