import React from "react";
import AudioCard from "../components/AudioCard";

const music = [
  {
    id: 1,
    title: "Focus Beats",
    creator: "Focus Lab",
    duration: "40 min",
    rating: 4.9,
    cover: "/images/music1.jpg",
    audio: "/audio/music1.mp3"
  },
  {
    id: 2,
    title: "Deep Work Music",
    creator: "Productivity Studio",
    duration: "35 min",
    rating: 4.8,
    cover: "/images/music2.jpg",
    audio: "/audio/music2.mp3"
  }
];

function MusicSection() {

  return (
    <div className="listening-section">

      <h2>Music</h2>

      {music.map((item) => (
        <AudioCard key={item.id} {...item} />
      ))}

    </div>
  );
}

export default MusicSection;