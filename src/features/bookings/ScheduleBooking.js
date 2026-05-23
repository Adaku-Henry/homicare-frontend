import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ScheduleBooking() {

  const location = useLocation();
  const navigate = useNavigate();

  const selectedProvider = location.state?.provider;

  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    type: "physical",
    notes: "",
    emergency: false,
    phone: "",
    address: ""
  });

  const [bookings, setBookings] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);

  // ================= LOAD BOOKINGS =================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("homicare_bookings")) || [];
    setBookings(saved);
  }, []);

  // ================= INPUT HANDLER =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // ================= PROVIDERS =================
  const providers = [
    { id: 1, name: "John Cleaner 🧹", service: "Cleaning", phone: "256700000001", rating: 4.8 },
    { id: 2, name: "Sarah Electrician ⚡", service: "Electrical", phone: "256700000002", rating: 4.7 },
    { id: 3, name: "Plumber Pro 🔧", service: "Plumbing", phone: "256700000003", rating: 4.9 }
  ];

  // ================= TIME SLOTS =================
  const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00"];

  // ================= MATCH PROVIDER =================
  const matchProvider = (service) => {
    if (selectedProvider) return selectedProvider;

    const match = providers.find(p =>
      service.toLowerCase().includes(p.service.toLowerCase())
    );

    return match || providers[0];
  };

  // ================= CHECK DOUBLE BOOKING =================
  const isAlreadyBooked = (provider, date, time) => {
    return bookings.some(
      b =>
        b.provider.id === provider.id &&
        b.date === date &&
        b.time === time &&
        b.status !== "Cancelled"
    );
  };

  // ================= PHONE VALIDATION =================
  const isValidPhone = (phone) => {
    return /^2567\d{8}$/.test(phone);
  };

  // ================= SUBMIT BOOKING =================
  const submitBooking = () => {

    if (!form.service || !form.date || !form.time || !form.phone || !form.address) {
      alert("❌ Please fill all required fields");
      return;
    }

    if (!isValidPhone(form.phone)) {
      alert("❌ Enter valid phone (2567XXXXXXXX)");
      return;
    }

    const provider = matchProvider(form.service);

    // 🚫 Prevent double booking
    if (isAlreadyBooked(provider, form.date, form.time)) {
      alert("❌ Provider already booked at this time!");
      return;
    }

    const booking = {
      id: Date.now(),
      provider,
      ...form,
      status: form.emergency ? "Priority" : "Pending",
      price: form.service === "Cleaning" ? "50,000 UGX" :
             form.service === "Electrical" ? "70,000 UGX" :
             "60,000 UGX",
      createdAt: new Date().toLocaleString()
    };

    const updated = [booking, ...bookings];

    setBookings(updated);
    localStorage.setItem("homicare_bookings", JSON.stringify(updated));

    setActiveBooking(booking);

    alert(`✅ Booking confirmed with ${provider.name}`);

    navigate("/tracking", { state: { booking } });
  };

  // ================= CANCEL BOOKING =================
  const cancelBooking = (id) => {
    const updated = bookings.map(b =>
      b.id === id ? { ...b, status: "Cancelled" } : b
    );

    setBookings(updated);
    localStorage.setItem("homicare_bookings", JSON.stringify(updated));

    alert("❌ Booking Cancelled");
  };

  return (
    <div style={styles.container}>

      <h2>🚀 Smart Booking System</h2>

      {/* SELECTED PROVIDER */}
      {selectedProvider && (
        <div style={styles.selectedBox}>
          <strong>👨‍🔧 Selected Provider</strong>
          <p>{selectedProvider.name}</p>
          <p>⭐ {selectedProvider.rating}</p>
        </div>
      )}

      {/* FORM */}
      <select name="service" onChange={handleChange} style={styles.input}>
        <option value="">Select Service</option>
        <option value="Cleaning">🧹 Cleaning (50k)</option>
        <option value="Electrical">⚡ Electrical (70k)</option>
        <option value="Plumbing">🔧 Plumbing (60k)</option>
      </select>

      <input
        type="tel"
        name="phone"
        placeholder="📞 Phone (2567XXXXXXXX)"
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="text"
        name="address"
        placeholder="📍 Your Address"
        onChange={handleChange}
        style={styles.input}
      />

      <input type="date" name="date" onChange={handleChange} style={styles.input} />

      {/* TIME SLOT */}
      <select name="time" onChange={handleChange} style={styles.input}>
        <option value="">Select Time</option>
        {timeSlots.map((t, i) => (
          <option key={i} value={t}>{t}</option>
        ))}
      </select>

      {/* NOTES */}
      <textarea
        name="notes"
        placeholder="📝 Additional Notes"
        onChange={handleChange}
        style={styles.input}
      />

      {/* EMERGENCY */}
      <label>
        <input type="checkbox" name="emergency" onChange={handleChange} />
        🚨 Emergency Booking
      </label>

      <button onClick={submitBooking} style={styles.button}>
        🚀 Confirm Booking
      </button>

      {/* BOOKINGS LIST */}
      <h3>📋 My Bookings</h3>
      {bookings.map(b => (
        <div key={b.id} style={styles.bookingCard}>
          <p><strong>{b.service}</strong> - {b.date} {b.time}</p>
          <p>Status: {b.status}</p>
          <button onClick={() => cancelBooking(b.id)}>Cancel</button>
        </div>
      ))}

    </div>
  );
}

// ================= STYLES =================
const styles = {
  container: { padding: 20, maxWidth: 500, margin: "auto" },
  input: { width: "100%", padding: 10, marginTop: 10 },
  button: {
    marginTop: 20,
    padding: 12,
    width: "100%",
    background: "#111827",
    color: "white",
    border: "none"
  },
  selectedBox: {
    background: "#dbeafe",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10
  },
  bookingCard: {
    background: "#f3f4f6",
    padding: 10,
    marginTop: 10,
    borderRadius: 6
  }
};

export default ScheduleBooking;