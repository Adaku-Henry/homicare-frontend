import React from "react";

function ProfileAbout({ profile }) {
  return (
    <div className="card">
      <h3>About</h3>
      <p>{profile.bio}</p>
    </div>
  );
}

export default ProfileAbout;