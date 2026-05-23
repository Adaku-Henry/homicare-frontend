import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// COMPONENTS
import HeroSection from "../Component/HeroSection";
import ServiceCategories from "../Component/ServiceCategories";
import FeaturedProviders from "../Component/FeaturedProviders";
import HowItWorks from "../Component/HowItWorks";
import Testimonials from "../Component/Testimonials";

function Home() {
  const navigate = useNavigate();

  const currentUser = {
    id: 999,
    name: "You",
    role: "User"
  };

  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);

  // ================= PROVIDERS =================
  const providers = [
    { id: 1, name: "John Cleaner 🧹", service: "Cleaning", rating: 4.8, distance: "2km" },
    { id: 2, name: "Sarah Electrician ⚡", service: "Electrical", rating: 4.7, distance: "5km" },
    { id: 3, name: "Plumber Pro 🔧", service: "Plumbing", rating: 4.9, distance: "3km" }
  ];

  // ================= AI RECOMMENDER =================
  useEffect(() => {
    setLoadingAI(true);

    setTimeout(() => {
      const recommended = providers.filter(p => p.rating > 4.7);
      setRecommendations(recommended);
      setLoadingAI(false);
    }, 1000);
  }, []);

  // ================= BOOK NOW =================
  const bookProvider = (provider) => {
    navigate("/bookings/schedule", {
      state: { provider }
    });
  };

  const handleSearch = () => {
    navigate("/services", { state: { query: search } });
  };

  // ================= POSTS =================
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "John Cleaner",
      role: "Cleaner",
      content: "Deep cleaning available this week!",
      likes: 10,
      comments: []
    }
  ]);

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

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, { text }]
        };
      }
      return p;
    }));

    setCommentInputs({
      ...commentInputs,
      [postId]: ""
    });
  };

  return (
    <div className="home-container">

      {/* HERO */}
      <HeroSection />

      {/* ================= AI SEARCH ================= */}
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Try: cleaner near me, plumber tomorrow..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* ================= AI RECOMMENDATIONS ================= */}
      <div className="providers-section">
        <h2>🤖 Recommended For You</h2>

        {loadingAI ? (
          <p>Analyzing your needs...</p>
        ) : (
          <div className="providers-grid">
            {recommendations.map(p => (
              <div key={p.id} className="provider-card premium">
                <div>
                  <strong>{p.name}</strong>
                  <p>{p.service}</p>
                  <p>⭐ {p.rating} • 📍 {p.distance}</p>
                </div>

                <button className="book-btn" onClick={() => bookProvider(p)}>
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= TRENDING ================= */}
      <div className="providers-section">
        <h2>🔥 Trending Services</h2>
        <div className="providers-grid">
          {["Cleaning", "Plumbing", "Electrical", "Laundry"].map((service, i) => (
            <div
              key={i}
              className="provider-card premium"
              onClick={() => navigate("/services", { state: { service } })}
            >
              {service}
            </div>
          ))}
        </div>
      </div>

      {/* ================= PROVIDERS ================= */}
      <div className="providers-section">
        <h2>🔥 Available Providers Near You</h2>

        <div className="providers-grid">
          {providers.map(p => (
            <div key={p.id} className="provider-card premium">

              <div className="provider-info">
                <strong>{p.name}</strong>
                <p>{p.service}</p>
                <p>⭐ {p.rating} • 📍 {p.distance}</p>
              </div>

              <div className="provider-actions">
                <button onClick={() => navigate(`/providers/${p.id}`)}>
                  View
                </button>

                <button
                  className="book-btn"
                  onClick={() => bookProvider(p)}
                >
                  Book Now
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="quick-actions premium">
        <button onClick={() => navigate("/services")}>🛠 Services</button>
        <button onClick={() => navigate("/providers")}>👨‍🔧 Providers</button>
        <button onClick={() => navigate("/bookings")}>📅 My Bookings</button>
        <button onClick={() => navigate("/wallet")}>💰 Wallet</button>
        <button onClick={() => navigate("/become-provider")}>🚀 Become a Provider</button>
        <button onClick={() => navigate("/ai-assistant")}>🤖 AI Assistant</button>
      </div>

      {/* ================= POST BOX ================= */}
      <div className="post-box premium">
        <textarea
          placeholder="Share something or request a service..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={addPost}>Post</button>
      </div>

      {/* ================= FEED ================= */}
      <div className="feed">
        {posts.map(post => (
          <div key={post.id} className="feed-card premium">

            <div className="feed-header">
              <strong>{post.name}</strong>
              <span>{post.role}</span>
            </div>

            <p>{post.content}</p>

            <div className="actions">
              <button onClick={() => likePost(post.id)}>
                👍 {post.likes}
              </button>

              <button onClick={() => navigate("/bookings/schedule", {
                state: { service: post.role }
              })}>
                Book Service
              </button>
            </div>

            <div className="comments">
              {post.comments.map((c, i) => (
                <div key={i} className="comment">{c.text}</div>
              ))}

              <input
                placeholder="Write comment..."
                value={commentInputs[post.id] || ""}
                onChange={(e) =>
                  setCommentInputs({
                    ...commentInputs,
                    [post.id]: e.target.value
                  })
                }
              />

              <button onClick={() => addComment(post.id)}>
                Send
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ================= EXTRA SECTIONS ================= */}
      <ServiceCategories />
      <FeaturedProviders />
      <HowItWorks />
      <Testimonials />

      {/* ================= CTA FOOTER ================= */}
      <div className="cta-footer">
        <h2>Need help at home?</h2>
        <p>Book trusted professionals instantly.</p>
        <button onClick={() => navigate("/services")}>Get Started</button>
      </div>

    </div>
  );
}

export default Home;