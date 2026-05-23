import React from "react";

function ProfileSkills({ profile }) {
  return (
    <div className="card">
      <h3>Skills</h3>

      <div className="skills">
        {profile.skills?.length ? (
          profile.skills.map((s, i) => (
            <span key={i} className="skill">
              {s}
            </span>
          ))
        ) : (
          <p>No skills added</p>
        )}
      </div>
    </div>
  );
}

export default ProfileSkills;