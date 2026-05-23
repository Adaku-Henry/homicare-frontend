import React from "react";
import PodcastCard from "../components/PodcastCard";
import { getPodcasts } from "../services/listeningService";

function PodcastsSection() {

  const podcasts = getPodcasts();

  return (
    <div className="listening-section">

      <h2>Podcasts</h2>

      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} {...podcast} />
      ))}

    </div>
  );
}

export default PodcastsSection;