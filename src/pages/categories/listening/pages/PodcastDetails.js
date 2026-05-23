import React from "react";
import EpisodeCard from "../components/EpisodeCard";

const episodes = [
  {
    id: 1,
    title: "Episode 1: Startup Ideas",
    duration: "25 min",
    description: "Discussing innovative startup ideas."
  },
  {
    id: 2,
    title: "Episode 2: Building MVP",
    duration: "30 min",
    description: "How to build your first product."
  }
];

function PodcastDetails() {

  return (

    <div className="listening-page">

      <h1>Podcast Details</h1>

      {episodes.map((ep) => (

        <EpisodeCard key={ep.id} {...ep} />

      ))}

    </div>

  );
}

export default PodcastDetails;