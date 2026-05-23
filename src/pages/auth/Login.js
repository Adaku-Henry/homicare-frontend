import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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

    const res = await login(form);

    if (res.success) {
      navigate("/provider/dashboard");
    }

    setLoading(false);
  };

  return (
    <div style={container}>

      {/* FLOAT ANIMATION STYLE */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>

      {/* BACKGROUND EFFECT */}
      <div style={bgGlow1}></div>
      <div style={bgGlow2}></div>

      {/* LEFT SIDE */}
      <div style={left}>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <img src="/favicon2.png" alt="logo" style={{ width: 60 }} />
          <h1 style={brand}>HomiCare</h1>
        </div>

        <p style={tagline}>
          Your trusted platform for hiring professionals effortlessly.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div style={right}>
        <div style={card}>

          {/* LOGO */}
          <img src="/favicon2.png" alt="logo" style={logo} />

          <h2 style={title}>Welcome Back 👋</h2>

          <form onSubmit={handleSubmit} style={formStyle}>

            {/* EMAIL */}
            <div style={inputGroup}>
              <span style={icon}>📧</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                style={input}
              />
            </div>

            {/* PASSWORD */}
            <div style={inputGroup}>
              <span style={icon}>🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                style={input}
              />
            </div>

            {/* BUTTON */}
            <button style={btn}>
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p style={footer}>
            Don’t have an account?{" "}
            <Link to="/register" style={link}>
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;

/* ================= PREMIUM STYLES ================= */

const container = {
  display: "flex",
  height: "100vh",
  fontFamily: "Segoe UI",
  background: "#fdab03",
  color: "#fff",
  overflow: "hidden",
  position: "relative",
};

/* GLOW BACKGROUND */
const bgGlow1 = {
  position: "absolute",
  width: 400,
  height: 400,
  background: "rgb(255,133,0)",
  filter: "blur(120px)",
  top: "-100px",
  left: "-100px",
};

const bgGlow2 = {
  position: "absolute",
  width: 400,
  height: 400,
  background: "rgba(6,182,212,0.4)",
  filter: "blur(120px)",
  bottom: "-100px",
  right: "-100px",
};

/* LEFT */
const left = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: 60,
};

const brand = {
  fontSize: 50,
  fontWeight: "bold",
};

const tagline = {
  marginTop: 10,
  opacity: 0.8,
};

/* RIGHT */
const right = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

/* CARD */
const card = {
  width: 350,
  padding: 30,
  borderRadius: 20,
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  textAlign: "center",
};

/* LOGO */
const logo = {
  width: 70,
  height: 70,
  objectFit: "contain",
  marginBottom: 15,
  borderRadius: "50%",
  padding: 8,
  background: "rgba(255,255,255,0.2)",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  animation: "float 3s ease-in-out infinite",
};

/* TITLE */
const title = {
  marginBottom: 20,
};

/* FORM */
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 15,
};

/* INPUT GROUP */
const inputGroup = {
  display: "flex",
  alignItems: "center",
  background: "rgba(255,255,255,0.2)",
  borderRadius: 10,
  padding: "8px 10px",
};

const icon = {
  marginRight: 8,
};

const input = {
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  color: "#fff",
};

/* BUTTON */
const btn = {
  padding: 12,
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(135deg,#4F46E5,#06B6D4)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};

/* FOOTER */
const footer = {
  marginTop: 15,
};

const link = {
  color: "#ff8700",
  textDecoration: "none",
};