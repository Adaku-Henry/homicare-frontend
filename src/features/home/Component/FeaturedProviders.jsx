import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedProviders.css"; // ✅ ADD THIS

/* ================= DATA ================= */
const initialProviders = [
  {
    id: 1,
    name: "John Cleaner",
    service: "Cleaning",
    rating: 4.8,
    reviews: 120,
    location: "Kampala",
    price: 15000,
    verified: true,
    available: true,
    phone: "256700000001",
    email: "john@email.com",
  },
  {
    id: 2,
    name: "Sarah Care",
    service: "Babysitting",
    rating: 4.9,
    reviews: 98,
    location: "Nansana",
    price: 20000,
    verified: true,
    available: false,
    phone: "256700000002",
    email: "sarah@email.com",
  },
];

export default function FeaturedProviders() {
  const navigate = useNavigate();

  const [providers] = useState(initialProviders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const [chatModal, setChatModal] = useState(null);
  const [bookingModal, setBookingModal] = useState(null);
  const [profileModal, setProfileModal] = useState(null);

  const [loading, setLoading] = useState(false);

  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    notes: "",
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const pushNotification = (msg) => {
    const note = { id: Date.now(), text: msg };
    setNotifications((prev) => [note, ...prev]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== note.id));
    }, 3000);
  };

  const filtered = providers.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || p.service === filter)
    );
  });

  const openWhatsApp = (phone) => {
    window.open(`https://wa.me/${phone}`, "_blank");
    pushNotification("Opening WhatsApp...");
  };

  const openSMS = (phone) => {
    window.open(`sms:${phone}`);
    pushNotification("Opening SMS...");
  };

  const openEmail = (email) => {
    window.open(`mailto:${email}`);
    pushNotification("Opening Email...");
  };

  const openInternalChat = (provider) => {
    navigate(`/chat/${provider.id}`);
  };

  const confirmBooking = () => {
    if (!bookingData.date || !bookingData.time) {
      pushNotification("Please select date and time");
      return;
    }

    setLoading(true);

    const booking = {
      ...bookingData,
      provider: bookingModal,
      id: Date.now(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const saved = JSON.parse(localStorage.getItem("bookings")) || [];

    localStorage.setItem(
      "bookings",
      JSON.stringify([booking, ...saved])
    );

    pushNotification("Booking Confirmed ✅");

    setTimeout(() => {
      setLoading(false);
      setBookingModal(null);
      setBookingData({ date: "", time: "", notes: "" });
    }, 800);
  };

  return (
    <div className="fp-container">

      {/* NOTIFICATIONS */}
      <div className="fp-notifications">
        {notifications.map((n) => (
          <div key={n.id} className="fp-notification">
            {n.text}
          </div>
        ))}
      </div>

      <h2 className="fp-title">Find Services</h2>

      <input
        className="fp-search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="fp-filters">
        {["All", "Cleaning", "Babysitting"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`fp-filter ${filter === f ? "active" : ""}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="fp-grid">
        {filtered.map((p) => (
          <div key={p.id} className="fp-card">

            <div className="fp-card-header">
              <h3>{p.name}</h3>
              <span
                className={`fp-heart ${favorites.includes(p.id) ? "active" : ""}`}
                onClick={() =>
                  setFavorites((prev) =>
                    prev.includes(p.id)
                      ? prev.filter((id) => id !== p.id)
                      : [...prev, p.id]
                  )
                }
              >
                ❤
              </span>
            </div>

            <p className="fp-service">{p.service}</p>

            <div className="fp-details">
              <p>📍 {p.location}</p>
              <p>💰 UGX {p.price}</p>
            </div>

            <div className="fp-actions">
              <button onClick={() => setBookingModal(p)}>Book</button>
              <button onClick={() => setChatModal(p)}>Chat</button>
              <button onClick={() => setProfileModal(p)}>Profile</button>
            </div>
          </div>
        ))}
      </div>

      {/* CHAT MODAL */}
      {chatModal && (
        <div className="fp-modal">
          <div className="fp-modal-content">
            <h3>Chat with {chatModal.name}</h3>

            <button onClick={() => openWhatsApp(chatModal.phone)}>WhatsApp</button>
            <button onClick={() => openSMS(chatModal.phone)}>SMS</button>
            <button onClick={() => openEmail(chatModal.email)}>Email</button>
            <button onClick={() => openInternalChat(chatModal)}>In-App Chat</button>

            <button onClick={() => setChatModal(null)}>Close</button>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookingModal && (
        <div className="fp-modal">
          <div className="fp-modal-content">
            <h3>Book {bookingModal.name}</h3>

            <input
              type="date"
              value={bookingData.date}
              onChange={(e) =>
                setBookingData({ ...bookingData, date: e.target.value })
              }
            />

            <input
              type="time"
              value={bookingData.time}
              onChange={(e) =>
                setBookingData({ ...bookingData, time: e.target.value })
              }
            />

            <textarea
              placeholder="Notes..."
              value={bookingData.notes}
              onChange={(e) =>
                setBookingData({ ...bookingData, notes: e.target.value })
              }
            />

            <button onClick={confirmBooking}>
              {loading ? "Processing..." : "Confirm Booking"}
            </button>

            <button onClick={() => setBookingModal(null)}>Cancel</button>
          </div>
        </div>
      )}
      {/* PROFILE MODAL */}
{profileModal && (
  <div className="fp-modal">
    <div className="fp-modal-content">
      <h3>{profileModal.name} Profile</h3>

      <p><strong>Service:</strong> {profileModal.service}</p>
      <p><strong>Location:</strong> {profileModal.location}</p>
      <p><strong>Rating:</strong> ⭐ {profileModal.rating}</p>
      <p><strong>Reviews:</strong> {profileModal.reviews}</p>
      <p><strong>Price:</strong> UGX {profileModal.price}</p>
      <p><strong>Phone:</strong> {profileModal.phone}</p>
      <p><strong>Email:</strong> {profileModal.email}</p>

      <p>
        <strong>Status:</strong>{" "}
        {profileModal.available ? "Available ✅" : "Unavailable ❌"}
      </p>

      <button onClick={() => setProfileModal(null)}>Close</button>
    </div>
  </div>
)}

      {/* MOBILE NAV */}
      <div className="fp-bottom-bar">
        <button onClick={() => navigate("/")}>🏠</button>
        <button onClick={() => navigate("/bookings")}>📅</button>
        <button onClick={() => navigate("/chat")}>💬</button>
        <button onClick={() => navigate("/profile")}>👤</button>
      </div>
    </div>
  );
}