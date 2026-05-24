import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// CONTEXT (IMPORTANT FIX)
import { useAuth } from "../../../context/AuthContext";

// COMPONENTS
import HeroSection from "../Component/HeroSection";
import ServiceCategories from "../Component/ServiceCategories";
import FeaturedProviders from "../Component/FeaturedProviders";
import HowItWorks from "../Component/HowItWorks";
import Testimonials from "../Component/Testimonials";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ REAL USER FIX

  const currentUser = user || {
    id: null,
    name: "Guest",
    role: "guest"
  };

  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);

  const providers = [
    { id: 1, name: "John Cleaner 🧹", service: "Cleaning", rating: 4.8, distance: "2km" },
    { id: 2, name: "Sarah Electrician ⚡", service: "Electrical", rating: 4.7, distance: "5km" },
    { id: 3, name: "Plumber Pro 🔧", service: "Plumbing", rating: 4.9, distance: "3km" }
  ];

  // ================= AI =================
  useEffect(() => {
    setLoadingAI(true);

    const timer = setTimeout(() => {
      setRecommendations(providers.filter(p => p.rating >= 4.7));
      setLoadingAI(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // ================= BOOK =================
  const bookProvider = (provider) => {
    navigate("/bookings/schedule", {
      state: {
        provider,
        user: currentUser
      }
    });
  };

  const handleSearch = () => {
    navigate("/services", { state: { query: search } });
  };

  // ================= POSTS =================
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [commentInputs, setCommentInputs] = useState({});

  const addPost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      name: currentUser.name,
      role: currentUser.role,
      content: newPost,
      likes: 0,
      comments: []
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const likePost = (id) => {
    setPosts(posts.map(p =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  const addComment = (postId) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;

    setPosts(posts.map(p =>
      p.id === postId
        ? { ...p, comments: [...p.comments, { text }] }
        : p
    ));

    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  return (
    <div className="home-container">

      {/* HERO */}
      <HeroSection />

      {/* SEARCH */}
      <div className="search-bar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Try: cleaner near me..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* AI RECOMMENDATIONS */}
      <div className="providers-section">
        <h2>🤖 Recommended For You</h2>

        {loadingAI ? (
          <p>Loading recommendations...</p>
        ) : (
          <div className="providers-grid">
            {recommendations.map(p => (
              <div key={p.id} className="provider-card premium">
                <strong>{p.name}</strong>
                <p>{p.service}</p>
                <p>⭐ {p.rating} • 📍 {p.distance}</p>

                <button onClick={() => bookProvider(p)}>
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TRENDING */}
      <div className="providers-section">
        <h2>🔥 Trending Services</h2>

        <div className="providers-grid">
          {["Cleaning", "Plumbing", "Electrical", "Laundry"].map((s, i) => (
            <div
              key={i}
              className="provider-card premium"
              onClick={() => navigate("/services", { state: { service: s } })}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* PROVIDERS */}
      <div className="providers-section">
        <h2>🔥 Available Providers</h2>

        <div className="providers-grid">
          {providers.map(p => (
            <div key={p.id} className="provider-card premium">

              <strong>{p.name}</strong>
              <p>{p.service}</p>
              <p>⭐ {p.rating}</p>

              <div>
                <button onClick={() => navigate(`/providers/${p.id}`)}>
                  View
                </button>

                <button onClick={() => bookProvider(p)}>
                  Book
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions premium">
        <button onClick={() => navigate("/services")}>Services</button>
        <button onClick={() => navigate("/providers")}>Providers</button>
        <button onClick={() => navigate("/bookings")}>Bookings</button>
        <button onClick={() => navigate("/wallet")}>Wallet</button>
      </div>

      {/* POST */}
      <div className="post-box premium">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share something..."
        />
        <button onClick={addPost}>Post</button>
      </div>

      {/* FEED */}
      <div className="feed">
        {posts.map(post => (
          <div key={post.id} className="feed-card premium">

            <strong>{post.name}</strong>
            <p>{post.content}</p>

            <button onClick={() => likePost(post.id)}>
              👍 {post.likes}
            </button>

            <input
              value={commentInputs[post.id] || ""}
              onChange={(e) =>
                setCommentInputs({
                  ...commentInputs,
                  [post.id]: e.target.value
                })
              }
            />

            <button onClick={() => addComment(post.id)}>
              Comment
            </button>

          </div>
        ))}
      </div>

      {/* EXTRA */}
      <ServiceCategories />
      <FeaturedProviders />
      <HowItWorks />
      <Testimonials />

    </div>
  );
}

export default Home;