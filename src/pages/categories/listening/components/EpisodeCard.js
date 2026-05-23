import React from "react";

function EpisodeCard({ title, duration, description }) {
  return (
    <div className="episode-card">

      <div className="episode-info">
        <h4>{title}</h4>
        <p>{description}</p>
        <span>{duration}</span>
      </div>

      <button className="episode-play">Play</button>

    </div>
  );
}

export default EpisodeCard;