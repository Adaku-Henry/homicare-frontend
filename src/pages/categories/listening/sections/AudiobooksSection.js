
import React from "react";
import { getAudiobooks } from "../services/listeningService";

function AudiobooksSection() {

  const books = getAudiobooks();

  return (
    <div className="listening-section">

      <h2>Audiobooks</h2>

      {books.map((book) => (

        <div key={book.id} className="audiobook-card">

          <h4>{book.title}</h4>
          <p>{book.author}</p>
          <span>{book.duration}</span>

          <button>Play</button>

        </div>

      ))}

    </div>
  );
}

export default AudiobooksSection;