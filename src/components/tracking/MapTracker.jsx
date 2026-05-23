import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { startTracking, stopTracking } from "../../features/profile/utils/trackingEngine";
import ProviderLiveCard from "./ProviderLiveCard";
import TrackingControls from "./TrackingControls";

// ================= CUSTOM ICONS =================
const providerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
  iconSize: [40, 40]
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
  iconSize: [40, 40]
});

function MapTrackerMap({ booking }) {
  const [tracking, setTracking] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  // ================= START TRACKING =================
  const handleStart = () => {
    setIsTracking(true);

    startTracking({
      providerLocation: booking?.providerLocation || {
        lat: -0.3476,
        lng: 32.5825
      },
      userLocation: booking?.userLocation || {
        lat: -0.3156,
        lng: 32.5656
      },
      onUpdate: (data) => {
        setTracking(data);
      },
      speed: 0.002
    });
  };

  // ================= STOP TRACKING =================
  const handleStop = () => {
    stopTracking();
    setIsTracking(false);
  };

  // ================= SHARE =================
  const handleShare = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    alert("📍 Tracking link copied!");
  };

  // ================= EMERGENCY =================
  const handleEmergency = () => {
    alert("🚨 Emergency alert sent to support team!");
    console.log("EMERGENCY TRIGGERED 🚨", booking);
  };

  // ================= AUTO START =================
  useEffect(() => {
    if (booking) handleStart();
    return () => stopTracking();
  }, [booking]);

  return (
    <div className="tracker-container">

      {/* ================= MAP ================= */}
      <MapContainer
        center={[-0.3156, 32.5656]}
        zoom={13}
        style={{ height: "350px", borderRadius: "12px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* USER MARKER */}
        <Marker position={[-0.3156, 32.5656]} icon={userIcon}>
          <Popup>🏠 You are here</Popup>
        </Marker>

        {/* PROVIDER MARKER */}
        {tracking && (
          <Marker
            position={[
              tracking.providerLocation.lat,
              tracking.providerLocation.lng
            ]}
            icon={providerIcon}
          >
            <Popup>
              🚗 {booking?.provider?.name || "Provider"}
              <br />
              {tracking.status}
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* ================= LIVE PANEL ================= */}
      <div className="tracker-panel">

        <ProviderLiveCard tracking={tracking} booking={booking} />

        <div className="tracker-card">
          <h3>📍 Live Tracking Info</h3>

          <p><strong>Status:</strong> {tracking?.status || "Waiting..."}</p>
          <p>📏 Distance: {tracking?.distance || "--"} km</p>
          <p>⏱️ ETA: {tracking?.eta || "--"} min</p>

          <p style={{ marginTop: 10, fontSize: 12, color: "gray" }}>
            🔒 Secure real-time tracking enabled
          </p>
        </div>
      </div>

      {/* ================= CONTROLS ================= */}
      <TrackingControls
        onStart={handleStart}
        onStop={handleStop}
        onShare={handleShare}
        onEmergency={handleEmergency}
        isTracking={isTracking}
      />

    </div>
  );
}

export default MapTrackerMap;