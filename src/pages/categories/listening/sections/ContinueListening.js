import React from "react";
import AudioCard from "../components/AudioCard";

const history = [
  {
    id: 1,
    title: "Startup Podcast",
    creator: "Tech Africa",
    duration: "25 min",
    rating: 4.7,
    cover: "/images/history1.jpg",
    audio: "/audio/startup.mp3"
  }
];

function ContinueListening() {

  return (
    <div className="listening-section">

      <h2>Continue Listening</h2>

      {history.map((item) => (
        <AudioCard key={item.id} {...item} />
      ))}

    </div>
  );
}

export default ContinueListening;