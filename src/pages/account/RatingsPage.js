// src/pages/account/RatingsPage.js
import React, { useState, useEffect } from "react";
import "./RatingsPage.css";

// Sample ratings data
const sampleRatings = [
  {
    id: 1,
    provider: "John Cleaning",
    reviewer: "Alice",
    rating: 5,
    review: "Excellent service, very thorough!",
    date: "2026-03-10",
    verified: true,
    helpfulVotes: 12,
  },
  {
    id: 2,
    provider: "Peter Electric",
    reviewer: "Bob",
    rating: 4,
    review: "Fixed my wiring quickly, but arrived late.",
    date: "2026-03-12",
    verified: true,
    helpfulVotes: 5,
  },
  {
    id: 3,
    provider: "Mary Laundry",
    reviewer: "Catherine",
    rating: 3,
    review: "Clothes were clean but some were wrinkled.",
    date: "2026-03-11",
    verified: false,
    helpfulVotes: 3,
  },
  // Add more ratings here...
];

function RatingsPage() {
  const [ratings, setRatings] = useState([]);
  const [filterRating, setFilterRating] = useState(0);
  const [sortOption, setSortOption] = useState("latest");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Load ratings from API or use sample
    setRatings(sampleRatings);
  }, []);

  // Filter, sort, and search logic
  const filteredRatings = ratings
    .filter(r => r.rating >= filterRating)
    .filter(r => r.provider.toLowerCase().includes(searchText.toLowerCase()) || r.review.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "highest") return b.rating - a.rating;
      if (sortOption === "lowest") return a.rating - b.rating;
      if (sortOption === "helpful") return b.helpfulVotes - a.helpfulVotes;
      return new Date(b.date) - new Date(a.date); // latest by default
    });

  // Compute average rating
  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1)
      : 0;

  return (
    <div className="ratings-page">
      <h1>Ratings & Reviews</h1>

      {/* Statistics */}
      <div className="ratings-stats">
        <span>Average Rating: {averageRating} ⭐</span>
        <span>Total Reviews: {ratings.length}</span>
      </div>

      {/* Search, Filter, Sort */}
      <div className="ratings-controls">
        <input
          type="text"
          placeholder="Search reviews or providers..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />

        <select value={filterRating} onChange={e => setFilterRating(Number(e.target.value))}>
          <option value={0}>All Ratings</option>
          <option value={5}>5 Stars</option>
          <option value={4}>4 Stars & Up</option>
          <option value={3}>3 Stars & Up</option>
          <option value={2}>2 Stars & Up</option>
          <option value={1}>1 Star & Up</option>
        </select>

        <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Ratings List */}
      <div className="ratings-list">
        {filteredRatings.length === 0 ? (
          <p className="no-ratings">No ratings match your criteria.</p>
        ) : (
          filteredRatings.map(r => (
            <div key={r.id} className="rating-card">
              <div className="rating-header">
                <h3>{r.provider}</h3>
                <span className="rating-stars">{r.rating} ⭐</span>
              </div>
              <div className="reviewer-info">
                <span className="reviewer-name">{r.reviewer}</span>
                {r.verified && <span className="verified-badge">✔ Verified</span>}
                <span className="review-date">{new Date(r.date).toLocaleDateString()}</span>
              </div>
              <p className="review-text">{r.review}</p>
              <div className="review-footer">
                <span>{r.helpfulVotes} found this helpful</span>
                <button className="helpful-btn">👍 Helpful</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RatingsPage;