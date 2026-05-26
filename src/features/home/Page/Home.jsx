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

  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [commentInputs, setCommentInputs] = useState({});

  const providers = useMemo(
    () => [
      { id: 1, name: "John Cleaner 🧹", service: "Cleaning", rating: 4.8, distance: "2km", online: true, img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952" },
      { id: 2, name: "Sarah Electrician ⚡", service: "Electrical", rating: 4.7, distance: "5km", online: false, img: "https://images.unsplash.com/photo-1621905251189-08b45249d3c6" },
      { id: 3, name: "Plumber Pro 🔧", service: "Plumbing", rating: 4.9, distance: "3km", online: true, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
      { id: 4, name: "Painter Max 🎨", service: "Painting", rating: 4.6, distance: "4km", online: true, img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e" },
    ],
    []
  );

  useEffect(() => {
    setLoadingAI(true);

    const timer = setTimeout(() => {
      setRecommendations(providers.filter((p) => p.rating >= 4.7));
      setLoadingAI(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [providers]);

  const handleSearch = () => {
    navigate("/services", { state: { query: search } });
  };

  const bookProvider = (provider) => {
    navigate("/bookings/schedule", {
      state: { provider, user: currentUser },
    });
  };

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
    setPosts(posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  };

  const addComment = (postId) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;

    setPosts(
      posts.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, { text, user: currentUser.name }] }
          : p
      )
    );

    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const filteredPosts = posts;

  return (
    <div className="home-container">

      {/* HERO */}
      <HeroSection />

      {/* SEARCH */}
      <div className="search-box">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search electricians, cleaners, plumbers..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* AI SECTION */}
      <section className="section">
        <h2>🤖 Smart Picks for You</h2>

        {loadingAI ? (
          <p>Loading AI...</p>
        ) : (
          <div className="grid">
            {recommendations.map((p) => (
              <div key={p.id} className="card glass">
                <img src={p.img} alt="" />
                <h3>{p.name}</h3>
                <p>{p.service}</p>
                <small>⭐ {p.rating}</small>
                <button onClick={() => bookProvider(p)}>Book</button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TRENDING */}
      <section className="section">
        <h2>🔥 Trending</h2>

        <div className="grid">
          {["Cleaning", "Electrical", "Plumbing", "Painting", "Laundry"].map((s, i) => (
            <div
              key={i}
              className="card"
              onClick={() => navigate("/services", { state: { service: s } })}
            >
              <h3>{s}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PROVIDERS */}
      <section className="section">
        <h2>👷 Providers</h2>

        <div className="grid">
          {providers.map((p) => (
            <div key={p.id} className="card glass">
              <img src={p.img} alt="" />
              <h3>{p.name}</h3>
              <p>{p.service}</p>
              <small>{p.online ? "🟢 Online" : "⚫ Offline"}</small>

              <button onClick={() => navigate(`/providers/${p.id}`)}>View</button>
              <button onClick={() => bookProvider(p)}>Book</button>
            </div>
          ))}
        </div>
      </section>

      {/* ACTION HUB */}
      <section className="action-hub">
        <div onClick={() => navigate("/services")}>🛠 Services</div>
        <div onClick={() => navigate("/providers")}>👷 Providers</div>
        <div onClick={() => navigate("/bookings")}>📅 Bookings</div>
        <div onClick={() => navigate("/wallet")}>💳 Wallet</div>
        <div onClick={() => navigate("/support")}>🆘 Help</div>
      </section>

      {/* POSTS */}
      <section className="section">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share experience..."
        />
        <button onClick={addPost}>Post</button>
      </section>

      {/* FEED */}
      <section className="section">
        {filteredPosts.map((post) => (
          <div key={post.id} className="card">
            <h4>{post.user}</h4>
            <small>{post.time}</small>
            <p>{post.content}</p>

            <button onClick={() => likePost(post.id)}>👍 {post.likes}</button>

            <input
              placeholder="comment..."
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
        ))}
      </section>

      {/* MODULES */}
      <ServiceCategories />
      <FeaturedProviders />
      <HowItWorks />
      <Testimonials />

      {/* HOW IT WORKS */}
      <section className="how-it-works-section">
        <h2>🚀 How HomiCare Works</h2>
        <div className="flex-row">
          <div className="how-card"><h3>🔍 Search</h3><p>Find service fast</p></div>
          <div className="how-card"><h3>👷 Choose</h3><p>Select provider</p></div>
          <div className="how-card"><h3>📅 Book</h3><p>Schedule instantly</p></div>
          <div className="how-card"><h3>🏠 Enjoy</h3><p>Get service at home</p></div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <h2>📖 About HomiCare</h2>
        <div className="flex-row">
          <div className="about-card"><h3>Mission</h3><p>Fast services</p></div>
          <div className="about-card"><h3>Vision</h3><p>Africa platform</p></div>
          <div className="about-card"><h3>Trust</h3><p>Verified providers</p></div>
        </div>
      </section>

      {/* HELP */}
      <section className="help-section">
        <h2>🆘 Help Center</h2>
        <div className="flex-row">
          <div className="help-card"><h3>Support</h3><p>Contact us anytime</p></div>
          <div className="help-card"><h3>FAQ</h3><p>Common answers</p></div>
          <div className="help-card"><h3>Report</h3><p>Report issues</p></div>
        </div>
      </section>

    </div>
  );
}

export default Home;