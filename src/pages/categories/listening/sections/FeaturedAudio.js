import React from "react";
import AudioCard from "../components/AudioCard";
import { getFeaturedAudio } from "../services/listeningService";

function FeaturedAudio() {

  const audio = getFeaturedAudio();

  return (
    <div className="listening-section">

      <h2>Featured Audio</h2>

      {audio.map((item) => (
        <AudioCard key={item.id} {...item} />
      ))}

    </div>
  );
}

export default FeaturedAudio;