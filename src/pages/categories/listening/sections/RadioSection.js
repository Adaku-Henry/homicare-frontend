import React from "react";

const radioStations = [
  {
    id: 1,
    name: "Africa Hits Radio",
    genre: "Afrobeat"
  },
  {
    id: 2,
    name: "Global News Radio",
    genre: "News"
  },
  {
    id: 3,
    name: "Chill FM",
    genre: "Relaxation"
  }
];

function RadioSection() {

  return (
    <div className="listening-section">

      <h2>Live Radio</h2>

      {radioStations.map((station) => (

        <div key={station.id} className="radio-card">

          <h4>{station.name}</h4>

          <p>{station.genre}</p>

          <button>Listen</button>

        </div>

      ))}

    </div>
  );
}

export default RadioSection;