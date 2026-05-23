import React from "react";
import PlaylistCard from "../components/PlaylistCard";

const playlists = [
  {
    id: 1,
    title: "Focus Playlist",
    creator: "HomiCare",
    tracks: 15,
    cover: "/images/playlist1.jpg"
  },
  {
    id: 2,
    title: "Relaxation Playlist",
    creator: "Zen Studio",
    tracks: 12,
    cover: "/images/playlist2.jpg"
  }
];

function PlaylistPage() {

  return (

    <div className="listening-page">

      <h1>Playlists</h1>

      {playlists.map((pl) => (

        <PlaylistCard key={pl.id} {...pl} />

      ))}

    </div>

  );
}

export default PlaylistPage;