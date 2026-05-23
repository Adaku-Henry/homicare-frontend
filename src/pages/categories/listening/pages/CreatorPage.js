import React from "react";
import CreatorProfile from "../components/CreatorProfile";

function CreatorPage() {

  return (

    <div className="listening-page">

      <h1>Creators</h1>

      <CreatorProfile
        name="Mind Studio"
        followers="12k"
        avatar="/images/creator1.jpg"
        bio="Motivational and meditation content creator."
      />

      <CreatorProfile
        name="Tech Africa"
        followers="20k"
        avatar="/images/creator2.jpg"
        bio="Technology and startup podcast host."
      />

    </div>

  );
}

export default CreatorPage;