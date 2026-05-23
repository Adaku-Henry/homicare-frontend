import React from "react";
import AudioCard from "../components/AudioCard";
import { getTrendingAudio } from "../services/listeningService";

function TrendingAudio() {

  const audio = getTrendingAudio();

  return (
    <div className="listening-section">

      <h2>Trending</h2>

      {audio.map((item) => (
        <AudioCard key={item.id} {...item} />
      ))}

    </div>
  );
}

export default TrendingAudio;