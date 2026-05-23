// ================= GEO UTILS (HOMICARE TRACKING CORE) =================
// Handles distance, ETA, and location math for live provider tracking

/**
 * 📍 Calculate distance between two coordinates using Haversine formula
 * Returns distance in KM
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in KM

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * ⏱️ Estimate ETA based on distance + speed
 * default speed = 30 km/h (urban provider movement)
 */
export const estimateETA = (distanceKm, speedKmh = 30) => {
  if (!distanceKm || distanceKm <= 0) return 0;

  const hours = distanceKm / speedKmh;
  return Math.ceil(hours * 60); // minutes
};

/**
 * 📍 Convert degrees → radians
 */
const toRad = (value) => (value * Math.PI) / 180;

/**
 * 🚗 Generate intermediate movement step
 * Simulates provider movement toward user
 */
export const moveTowards = (from, to, step = 0.01) => {
  const latDiff = to.lat - from.lat;
  const lngDiff = to.lng - from.lng;

  return {
    lat: from.lat + latDiff * step,
    lng: from.lng + lngDiff * step
  };
};

/**
 * 📊 Determine tracking status based on distance
 */
export const getTrackingStatus = (distanceKm) => {
  if (distanceKm > 5) return "Provider is far away 🟠";
  if (distanceKm > 2) return "Provider is on the way 🚗";
  if (distanceKm > 0.5) return "Arriving soon 🟡";
  return "Almost there 🔵";
};