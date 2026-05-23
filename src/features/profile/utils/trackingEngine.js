// ================= HOMICARE LIVE TRACKING ENGINE =================
// Simulates real provider movement + updates tracking state in real-time

import {
  calculateDistance,
  estimateETA,
  moveTowards,
  getTrackingStatus
} from "./geoUtils";

// ================= GLOBAL TRACKING STORE =================
// (Simple in-memory tracking system)
let trackingInterval = null;
let currentTracking = null;

// ================= START TRACKING =================
export const startTracking = ({
  providerLocation,
  userLocation,
  onUpdate,
  speed = 0.005
}) => {
  console.log("🚀 Tracking initialized...");
  console.log("📍 Provider:", providerLocation);
  console.log("📍 User:", userLocation);

  if (trackingInterval) {
    clearInterval(trackingInterval);
  }

  let currentPosition = { ...providerLocation };

  trackingInterval = setInterval(() => {
    // 📏 Calculate distance
    const distance = calculateDistance(
      currentPosition.lat,
      currentPosition.lng,
      userLocation.lat,
      userLocation.lng
    );

    // ⏱️ Estimate ETA
    const eta = estimateETA(distance, 30);

    // 📊 Status
    const status = getTrackingStatus(distance);

    // 📍 Move provider closer to user
    currentPosition = moveTowards(currentPosition, userLocation, speed);

    // 📦 Build tracking payload
    currentTracking = {
      providerLocation: currentPosition,
      userLocation,
      distance: distance.toFixed(2),
      eta,
      status,
      timestamp: new Date().toISOString()
    };

    console.log("📡 Live Update:", currentTracking);

    // 🔔 Push update to UI
    if (onUpdate) {
      onUpdate(currentTracking);
    }

    // 🛑 Stop condition
    if (distance < 0.05) {
      stopTracking();

      const finalState = {
        ...currentTracking,
        distance: 0,
        eta: 0,
        status: "ARRIVED 🟢"
      };

      console.log("📍 Provider arrived:", finalState);

      if (onUpdate) {
        onUpdate(finalState);
      }
    }
  }, 1000);
};

// ================= STOP TRACKING =================
export const stopTracking = () => {
  if (trackingInterval) {
    clearInterval(trackingInterval);
    trackingInterval = null;
    console.log("🛑 Tracking stopped");
  }
};

// ================= GET CURRENT TRACK =================
export const getCurrentTracking = () => {
  return currentTracking;
};

// ================= RESET TRACKING =================
export const resetTracking = () => {
  stopTracking();
  currentTracking = null;
  console.log("♻️ Tracking reset");
};