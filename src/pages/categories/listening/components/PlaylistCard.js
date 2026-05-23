import React from "react";

function PlaylistCard({ title, creator, tracks, cover }) {
  return (
    <div className="playlist-card">
      <img src={cover} alt={title} />

      <div className="playlist-info">
        <h4>{title}</h4>
        <p>{creator}</p>
        <span>{tracks} Tracks</span>
      </div>

      <button className="playlist-play">Play</button>
    </div>
  );
}

export default PlaylistCard;