import React from "react";
import AudioCard from "../components/AudioCard";

const meditation = [
  {
    id: 1,
    title: "Morning Meditation",
    creator: "Zen Studio",
    duration: "15 min",
    rating: 4.9,
    cover: "/images/meditation1.jpg",
    audio: "/audio/meditation1.mp3"
  },
  {
    id: 2,
    title: "Sleep Relaxation",
    creator: "MindCare",
    duration: "30 min",
    rating: 4.8,
    cover: "/images/meditation2.jpg",
    audio: "/audio/meditation2.mp3"
  }
];

function MeditationSection() {

  return (
    <div className="listening-section">

      <h2>Meditation & Relaxation</h2>

      {meditation.map((item) => (
        <AudioCard key={item.id} {...item} />
      ))}

    </div>
  );
}

export default MeditationSection;