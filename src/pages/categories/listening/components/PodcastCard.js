import React from "react";

function PodcastCard({ title, creator, episodes, cover }) {
  return (
    <div className="podcast-card">

      <img src={cover} alt={title} />

      <div className="podcast-info">
        <h4>{title}</h4>
        <p>{creator}</p>
        <span>{episodes} Episodes</span>
      </div>

      <button className="podcast-btn">View</button>

    </div>
  );
}

export default PodcastCard;