import React from "react";

function CreatorProfile({ name, followers, avatar, bio }) {
  return (
    <div className="creator-profile">

      <img src={avatar} alt={name} />

      <div className="creator-info">
        <h3>{name}</h3>
        <p>{bio}</p>
        <span>{followers} followers</span>
      </div>

      <button className="follow-btn">Follow</button>

    </div>
  );
}

export default CreatorProfile;