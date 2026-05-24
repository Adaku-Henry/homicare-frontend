import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await login(form);

      if (res.success) {
        navigate("/provider/dashboard");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* Background Glow */}
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="brand-wrapper">
          <img
            src="/favicon2.png"
            alt="HomiCare Logo"
            className="brand-logo"
          />

          <h1>HomiCare</h1>
        </div>

        <p className="tagline">
          Your trusted platform for hiring professionals effortlessly.
        </p>

        <div className="feature-list">
          <div className="feature-item">✔ Trusted Service Providers</div>
          <div className="feature-item">✔ Fast Booking Experience</div>
          <div className="feature-item">✔ Secure & Reliable Platform</div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">

        <div className="login-card">

          <img
            src="/favicon2.png"
            alt="HomiCare"
            className="card-logo"
          />

          <h2>Welcome Back 👋</h2>

          <p className="login-subtitle">
            Login to continue using HomiCare
          </p>

          <form onSubmit={handleSubmit} className="login-form">

            {/* EMAIL */}
            <div className="input-group">
              <span className="input-icon">📧</span>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <span className="input-icon">🔒</span>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="login-footer">
            <p>
              Don’t have an account?
              <Link to="/register"> Register</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;