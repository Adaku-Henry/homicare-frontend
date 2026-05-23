import React, { useState } from "react";
import ProviderLiveCard from "../../../components/tracking/ProviderLiveCard";
import TrackingControls from "../../../components/tracking/TrackingControls";
import { createTrackingEngine } from "../../../utils/trackingEngine";
import "./Tracking.css";

function BookingTracker() {

  const [tracking, setTracking] = useState(null);

  const engine = createTrackingEngine({
    onUpdate: (data) => setTracking(data),
    onArrive: (data) => setTracking(data)
  });

  const booking = {
    id: 1,
    provider: {
      name: "John Cleaner 🧹"
    }
  };

  return (
    <div className="tracking-container">

      <h2>📍 Live Tracking</h2>

      <ProviderLiveCard tracking={tracking} />

      <TrackingControls
        onStart={() => engine.start(booking)}
        onStop={() => engine.stop()}
      />

    </div>
  );
}

export default BookingTracker;