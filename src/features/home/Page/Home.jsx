import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import { useAuth } from "../../../context/AuthContext";

import HeroSection from "../Component/HeroSection";
import ServiceCategories from "../Component/ServiceCategories";
import FeaturedProviders from "../Component/FeaturedProviders";
import HowItWorks from "../Component/HowItWorks";
import Testimonials from "../Component/Testimonials";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const currentUser = user || {
    id: null,
    name: "Guest",
    role: "guest",
  };

  // ================= SEARCH =================
  const [search, setSearch] = useState("");

  // ================= AI RECOMMENDATIONS =================
  const [recommendations, setRecommendations] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);

  // ================= POSTS SYSTEM =================
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [feedFilter, setFeedFilter] = useState("all");

  // ================= PROVIDERS (FIXED ESLINT DEPENDENCY) =================
  const providers = useMemo(() => ([
    { id: 1, name: "John Cleaner 🧹", service: "Cleaning", rating: 4.8, distance: "2km", online: true },
    { id: 2, name: "Sarah Electrician ⚡", service: "Electrical", rating: 4.7, distance: "5km", online: false },
    { id: 3, name: "Plumber Pro 🔧", service: "Plumbing", rating: 4.9, distance: "3km", online: true },
    { id: 4, name: "Painter Max 🎨", service: "Painting", rating: 4.6, distance: "4km", online: true },
  ]), []);

  // ================= AI SYSTEM =================
  useEffect(() => {
    setLoadingAI(true);

    const timer = setTimeout(() => {
      setRecommendations(
        providers.filter((p) => p.rating >= 4.7).slice(0, 3)
      );
      setLoadingAI(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [providers]); // ✅ FIXED WARNING

  // ================= NAV =================
  const handleSearch = () => {
    navigate("/services", { state: { query: search } });
  };

  const bookProvider = (provider) => {
    navigate("/bookings/schedule", {
      state: { provider, user: currentUser },
    });
  };

  // ================= POSTS =================
  const addPost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      user: currentUser.name,
      role: currentUser.role,
      content: newPost,
      likes: 0,
      comments: [],
      time: new Date().toLocaleTimeString(),
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const likePost = (id) => {
    setPosts(posts.map((p) =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  const addComment = (postId) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;

    setPosts(posts.map((p) =>
      p.id === postId
        ? {
            ...p,
            comments: [...p.comments, { text, user: currentUser.name }],
          }
        : p
    ));

    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const filteredPosts =
    feedFilter === "all"
      ? posts
      : posts.filter((p) => p.role === feedFilter);

  return (
    <div className="home-container">

      <section className="section">
        <HeroSection />
      </section>

      <section className="section search-box">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cleaners, electricians, plumbers..."
        />
        <button onClick={handleSearch}>Search</button>
      </section>

      <section className="section">
        <h2>🤖 Smart Recommendations</h2>

        {loadingAI ? (
          <p>Loading AI suggestions...</p>
        ) : (
          <div className="grid">
            {recommendations.map((p) => (
              <div key={p.id} className="card">
                <div>
                  <strong>{p.name}</strong>
                  <p>{p.service}</p>
                  <small>⭐ {p.rating} • 📍 {p.distance}</small>
                </div>
                <button onClick={() => bookProvider(p)}>Book</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h2>🔥 Trending Services</h2>
        <div className="grid">
          {["Cleaning", "Plumbing", "Electrical", "Laundry"].map((s, i) => (
            <div
              key={i}
              className="card"
              onClick={() => navigate("/services", { state: { service: s } })}
            >
              <strong>{s}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>👷 Available Providers</h2>

        <div className="grid">
          {providers.map((p) => (
            <div key={p.id} className="card">
              <div>
                <strong>{p.name}</strong>
                <p>{p.service}</p>
                <small>⭐ {p.rating}</small>
                <small>{p.online ? "🟢 online" : "⚫ offline"}</small>
              </div>

              <div>
                <button onClick={() => navigate(`/providers/${p.id}`)}>
                  View
                </button>
                <button onClick={() => bookProvider(p)}>Book</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="quick-actions">
          <button onClick={() => navigate("/services")}>Services</button>
          <button onClick={() => navigate("/providers")}>Providers</button>
          <button onClick={() => navigate("/bookings")}>Bookings</button>
          <button onClick={() => navigate("/wallet")}>Wallet</button>
        </div>
      </section>
      <div className="quick-actions">
  <button onClick={() => setFeedFilter("all")}>All</button>
  <button onClick={() => setFeedFilter("guest")}>Users</button>
  <button onClick={() => setFeedFilter("provider")}>Providers</button>
</div>

      <section className="section">
        <div className="card">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your experience..."
          />
          <button onClick={addPost}>Post</button>
        </div>
      </section>

      <section className="section feed-box">
        {filteredPosts.map((post) => (
          <div key={post.id} className="card">
            <div>
              <strong>{post.user}</strong>
              <small>{post.time}</small>
              <p>{post.content}</p>
            </div>

            <div>
              <button onClick={() => likePost(post.id)}>👍 {post.likes}</button>

              <input
                value={commentInputs[post.id] || ""}
                onChange={(e) =>
                  setCommentInputs({
                    ...commentInputs,
                    [post.id]: e.target.value,
                  })
                }
              />

              <button onClick={() => addComment(post.id)}>Comment</button>
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <ServiceCategories />
      </section>

      <section className="section">
        <FeaturedProviders />
      </section>

      <section className="section">
        <HowItWorks />
      </section>

      <section className="section">
        <Testimonials />
      </section>

      {/* ================= HOMICARE FOOTER (FIXED INSIDE COMPONENT) ================= */}
      <section className="homi-footer">

        <div className="footer-block">
          <h2>Welcome to HomiCare</h2>
          <p>
            HomiCare connects you with trusted home service providers across Uganda.
            Book cleaners, electricians, plumbers and more in seconds.
          </p>
        </div>

        <div className="footer-cta">
          <h2>Start using HomiCare today</h2>
          <p>Reliable home services at your fingertips.</p>

          <button onClick={() => navigate("/services")}>
            Explore Services
          </button>
        </div>

      </section>

    </div>
  );
}

export default Home;