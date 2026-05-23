import React from "react";
import "./ListeningPage.css";

import FeaturedAudio from "./sections/FeaturedAudio";
import TrendingAudio from "./sections/TrendingAudio";
import PodcastsSection from "./sections/PodcastsSection";
import AudiobooksSection from "./sections/AudiobooksSection";
import MusicSection from "./sections/MusicSection";
import MeditationSection from "./sections/MeditationSection";
import RadioSection from "./sections/RadioSection";
import ContinueListening from "./sections/ContinueListening";

import AudioPlayer from "./components/AudioPlayer";

function ListeningPage() {

  return (

    <div className="listening-page">

      <h1>Listening</h1>

      <input
        className="listening-search"
        placeholder="Search music, podcasts, audiobooks"
      />

      <ContinueListening />

      <FeaturedAudio />

      <TrendingAudio />

      <MusicSection />

      <MeditationSection />

      <PodcastsSection />

      <AudiobooksSection />

      <RadioSection />

      <AudioPlayer />

    </div>

  );
}

export default ListeningPage;