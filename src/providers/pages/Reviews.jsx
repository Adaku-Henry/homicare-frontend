import React, { useMemo, useState } from "react";
import { providersData } from "../data/providerData";

export default function Reviews() {
  // ✅ SAFE provider fallback
  const provider = providersData?.[0] || {};

  // ================= MOCK REVIEWS DATA =================
  const [reviews] = useState([
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Excellent service, very professional and fast.",
      date: "2026-01-10",
    },
    {
      id: 2,
      name: "Sarah Kim",
      rating: 4,
      comment: "Good work, but arrived slightly late.",
      date: "2026-01-08",
    },
    {
      id: 3,
      name: "David Lee",
      rating: 3,
      comment: "Average experience, needs improvement.",
      date: "2026-01-05",
    },
    {
      id: 4,
      name: "Ann Grace",
      rating: 5,
      comment: "Perfect job! Highly recommended.",
      date: "2026-01-02",
    },
  ]);

  // ================= AVERAGE RATING =================
  const averageRating = useMemo(() => {
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  // ================= RATING DISTRIBUTION =================
  const ratingCount = (star) =>
    reviews.filter((r) => r.rating === star).length;

  return (
    <div style={container}>

      <div style={header}>
        <h2>Reviews & Ratings</h2>
        <p>Customer feedback and performance insights</p>
      </div>

      {/* ================= SUMMARY ================= */}
      <div style={summaryGrid}>

        <div style={summaryCard}>
          <h1>{averageRating} ⭐</h1>
          <p>Average Rating</p>
          <small>{reviews.length} total reviews</small>
        </div>

        <div style={summaryCard}>
          <h3>Rating Breakdown</h3>

          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} style={ratingRow}>
              <span>{star} ⭐</span>

              <div style={barBg}>
                <div
                  style={{
                    ...barFill,
                    width: `${(ratingCount(star) / reviews.length) * 100}%`,
                  }}
                />
              </div>

              <span>{ratingCount(star)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= REVIEWS LIST ================= */}
      <div style={listSection}>
        <h3>Customer Reviews</h3>

        {reviews.map((review) => (
          <div key={review.id} style={card}>

            <div style={cardHeader}>
              <div>
                <strong>{review.name}</strong>
                <p style={date}>{review.date}</p>
              </div>

              <div style={stars}>
                {"⭐".repeat(review.rating)}
              </div>
            </div>

            <p style={comment}>{review.comment}</p>

            <span
              style={{
                ...tag,
                background:
                  review.rating >= 4
                    ? "#e6ffe6"
                    : review.rating === 3
                    ? "#fff3cd"
                    : "#ffe6e6",
              }}
            >
              {review.rating >= 4
                ? "Positive"
                : review.rating === 3
                ? "Neutral"
                : "Negative"}
            </span>
          </div>
        ))}
      </div>

      {/* ================= INSIGHTS ================= */}
      <div style={insights}>
        <h3>Performance Insights</h3>

        <ul>
          <li>⭐ Maintain 4.5+ rating for visibility</li>
          <li>⚡ Fast responses improve satisfaction</li>
          <li>💬 Respond to negative reviews professionally</li>
          <li>📈 More reviews increase bookings</li>
        </ul>
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  padding: "20px",
  background: "#f4f6fb",
  minHeight: "100vh",
};

const header = {
  marginBottom: "20px",
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const summaryCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
};

const ratingRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "8px",
};

const barBg = {
  flex: 1,
  height: "8px",
  background: "#eee",
  borderRadius: "5px",
};

const barFill = {
  height: "8px",
  background: "#2d7ff9",
  borderRadius: "5px",
};

const listSection = {
  marginTop: "30px",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
};

const card = {
  padding: "15px",
  borderBottom: "1px solid #eee",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
};

const date = {
  fontSize: "12px",
  color: "#777",
};

const stars = {
  fontSize: "18px",
};

const comment = {
  marginTop: "10px",
  color: "#444",
};

const tag = {
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

const insights = {
  marginTop: "30px",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
};