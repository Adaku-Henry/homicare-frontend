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

     {/* HOW IT WORKS */}
<section className="info-section">
  <div className="section-header">
    <h2>🚀 How HomiCare Works</h2>
    <p>
      Simple steps to connect customers with trusted home service providers.
    </p>
  </div>

  <div className="card-flex-grid">
    <div className="info-card how-card">
      <h3>🔍 Search Services</h3>

    <p>
      HomiCare makes it easy for users to quickly search and discover a wide
      range of trusted home services from one centralized platform. Whether you
      need cleaners, electricians, plumbers, painters, caregivers, mechanics,
      laundry workers, tutors, or technicians, the smart search system helps you
      locate the right professionals in just a few seconds.
    </p>

    <p>
      Users can search using keywords, service categories, locations, ratings,
      availability status, and pricing preferences to find services that match
      their exact needs. The intelligent recommendation system also suggests
      highly rated providers based on user interests and previous interactions.
    </p>

    <p>
      HomiCare’s goal is to reduce the stress and time wasted searching for
      reliable professionals by providing a simple, fast, and user-friendly
      discovery experience accessible from both mobile devices and desktop
      platforms.
    </p>
    </div>

    <div className="info-card how-card">
      <h3>👷 Choose a Provider</h3>
       <p>
      After searching for a service, users can browse through a list of verified
      service providers and select the one that best fits their needs. Each
      provider profile contains important details including ratings, reviews,
      completed jobs, skills, certifications, pricing information, availability,
      and online status.
    </p>

    <p>
      HomiCare prioritizes transparency and trust by allowing customers to
      compare providers before making a decision. Users can view provider
      experience, customer feedback, response time, and portfolio images to help
      them confidently choose qualified professionals.
    </p>

    <p>
      This selection process ensures users receive high-quality services from
      trusted experts while providers gain opportunities to build professional
      reputations and attract more customers through positive performance and
      excellent service delivery.
    </p>
    </div>

    <div className="info-card how-card">
      <h3>📅 Book Instantly</h3>
      <p>
      HomiCare offers a smart and convenient booking system that allows users to
      schedule services instantly from their devices without unnecessary delays.
      Once a provider is selected, customers can choose their preferred service
      date, time, location, and additional service details directly through the
      platform.
    </p>

    <p>
      The booking system supports real-time availability tracking, instant
      confirmations, booking management, cancellations, and rescheduling options
      to provide flexibility and convenience for users. Customers can also
      communicate directly with providers before or after confirming bookings.
    </p>

    <p>
      By digitizing the booking process, HomiCare eliminates traditional
      inconveniences associated with manual scheduling and creates a faster,
      smoother, and more efficient service experience for both customers and
      service providers.
    </p>
    </div>

    <div className="info-card how-card">
      <h3>🏠 Enjoy Professional Service</h3>
      <p>
      Once the booking is confirmed, the selected service provider arrives at the
      customer’s location to deliver professional and reliable service directly
      at their doorstep. HomiCare focuses on creating a comfortable, secure, and
      stress-free experience where customers can enjoy quality services from
      trusted professionals without leaving their homes.
    </p>

    <p>
      Users can monitor service progress, communicate with providers in
      real-time, make secure payments, and provide ratings or reviews after the
      service is completed. This helps maintain quality standards and encourages
      professionalism across the platform.
    </p>

    <p>
      HomiCare’s service experience is designed to save time, increase
      convenience, improve household management, and ensure customer satisfaction
      through efficient digital solutions and dependable service delivery.
    </p>
    </div>
  </div>
</section>

{/* ABOUT */}
<section className="info-section">
  <div className="section-header">
    <h2>📖 About HomiCare</h2>
    <p>
      Building Africa’s trusted digital home service ecosystem.
    </p>
  </div>

  <div className="card-flex-grid">
    <div className="info-card about-card">
      <h3>🎯 Mission</h3>
      <p>
      HomiCare’s mission is to transform the way people access home services by
      providing fast, reliable, affordable, and technology-driven solutions for
      households across Uganda and Africa. We aim to simplify everyday life by
      connecting customers with trusted professionals including cleaners,
      electricians, plumbers, painters, caregivers, mechanics, and other skilled
      workers through one powerful digital platform.
    </p>

    <p>
      Our goal is to remove the stress, delays, insecurity, and uncertainty that
      many people face when searching for home service providers. Through smart
      booking systems, real-time communication, secure payment methods, and
      verified professionals, HomiCare ensures users receive quality services
      directly at their doorstep in a convenient and efficient manner.
    </p>

    <p>
      We are committed to improving customer experience, empowering local service
      providers with digital opportunities, creating employment for youth, and
      building a trustworthy ecosystem where both customers and providers can
      interact safely and professionally.
    </p>
    </div>

    <div className="info-card about-card">
      <h3>🌍 Vision</h3>
      <p>
      HomiCare’s vision is to become Africa’s leading digital home service
      marketplace by revolutionizing how people discover, book, and manage
      household services. We envision a future where every household can access
      trusted service providers instantly using modern technology from anywhere
      at any time.
    </p>

    <p>
      Our platform aims to bridge the gap between skilled workers and customers
      by creating a smart digital ecosystem that supports transparency,
      convenience, innovation, and economic growth. We aspire to expand across
      multiple cities and countries in Africa while continuously introducing
      advanced features such as AI-powered recommendations, real-time provider
      tracking, smart scheduling systems, secure digital payments, and integrated
      communication tools.
    </p>

    <p>
      HomiCare seeks to become not only a service-booking platform but also a
      trusted lifestyle companion that improves living standards, promotes
      digital transformation, and contributes to the growth of Africa’s digital
      economy through innovation and technology.
    </p>
    </div>

    <div className="info-card about-card">
      <h3>🔐 Trust & Security</h3>
      <p>
      Trust, safety, and professionalism are at the core of everything HomiCare
      stands for. We understand that inviting someone into your home requires
      confidence and assurance, which is why we prioritize provider verification,
      accountability, and customer protection throughout the platform.
    </p>

    <p>
      Every service provider on HomiCare undergoes identity verification,
      profile screening, ratings assessment, and continuous monitoring to ensure
      quality service delivery. Customers can view provider profiles, ratings,
      reviews, availability status, and service history before making a booking
      decision.
    </p>

    <p>
      We also provide secure payment systems, transparent pricing, real-time
      communication features, and customer support services to enhance safety and
      reliability. Our trust system is designed to create a secure environment
      where customers feel confident while providers build strong professional
      reputations through excellent service delivery and positive customer
      experiences.
    </p>

    <p>
      By combining technology with accountability, HomiCare creates a dependable
      ecosystem that promotes integrity, customer satisfaction, and long-term
      trust between households and service providers.
    </p>
    </div>
  </div>
</section>

{/* HELP */}
<section className="info-section">
  <div className="section-header">
    <h2>🆘 Help Center</h2>
    <p>
      Fast support, issue resolution, and platform guidance.
    </p>
  </div>

  <div className="card-flex-grid">
    <div className="info-card help-card">
      <h3>📞 Customer Support</h3>
      <p>
      HomiCare provides dedicated customer support services to ensure every user
      receives assistance whenever needed. Our support team is available to help
      customers and service providers with booking issues, payment concerns,
      account management, technical difficulties, scheduling problems, and other
      platform-related inquiries.
    </p>

    <p>
      Users can contact support through multiple communication channels including
      live chat, phone calls, email support, and in-app messaging systems. We
      focus on providing fast response times, professional assistance, and
      customer-centered solutions to improve user satisfaction and platform
      reliability.
    </p>

    <p>
      Whether you need help booking a service, tracking a provider, updating your
      profile, or resolving disputes, HomiCare’s support system is designed to
      guide you through every step quickly and efficiently. Our mission is to
      create a seamless digital experience where users feel supported, valued,
      and confident while using the platform.
    </p>
    </div>

    <div className="info-card help-card">
      <h3>❓ FAQ</h3>
      <p>
      The Frequently Asked Questions section is designed to provide quick answers
      to common questions asked by users and service providers on the HomiCare
      platform. This section helps users understand how the system works without
      needing to contact customer support for basic guidance.
    </p>

    <p>
      Users can find information related to account registration, booking
      procedures, payment methods, provider verification, cancellations,
      rescheduling services, wallet management, refunds, reviews and ratings,
      service tracking, and platform security.
    </p>

    <p>
      The FAQ section improves user convenience by offering instant solutions and
      easy-to-understand explanations that save time and enhance the overall user
      experience. It also helps new users learn how to navigate the platform and
      utilize all available features effectively.
    </p>

    <p>
      By maintaining a detailed and updated FAQ knowledge base, HomiCare ensures
      transparency, accessibility, and better communication between the platform
      and its users.
    </p>
    </div>

    <div className="info-card help-card">
      <h3>⚠ Report Issues</h3>
      <p>
      HomiCare provides a secure and transparent reporting system that allows
      users to report problems, complaints, suspicious activities, poor service
      delivery, payment disputes, delays, misconduct, or technical issues
      directly through the platform.
    </p>

    <p>
      The reporting feature helps maintain service quality, customer safety, and
      provider accountability by ensuring that all complaints are reviewed and
      addressed professionally. Users can submit detailed reports with comments,
      ratings, screenshots, or supporting evidence to help the support team
      investigate issues effectively.
    </p>

    <p>
      HomiCare values customer trust and takes every report seriously to ensure a
      safe and reliable environment for all users. Our moderation and resolution
      system helps identify problematic behaviors, improve service standards, and
      protect both customers and providers from unfair practices.
    </p>

    <p>
      Through continuous monitoring, transparent communication, and quick issue
      resolution, HomiCare aims to maintain a trusted digital ecosystem that
      promotes professionalism, customer satisfaction, and long-term reliability.
    </p>
  </div>
 </div>
</section>

      {/* COPYRIGHT FOOTER */}
      <footer className="footer">
        <div className="footer-content">

          <div className="footer-brand">
            <h3>🏠 HomiCare</h3>
            <p>
              Smart digital platform connecting households with trusted
              service providers across Uganda and Africa.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>

            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/providers">Providers</a>
            <a href="/contact">Contact</a>
          </div>

          <div className="footer-links">
            <h4>Support</h4>

            <a href="/">Help Center</a>
            <a href="/">FAQs</a>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms & Conditions</a>
          </div>

          <div className="footer-links">
            <h4>Contact</h4>

            <p>📍 Arua, Uganda</p>
            <p>📞 +256 777234127</p>
            <p>✉ support@homicare.com</p>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 HomiCare. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}

export default Home;