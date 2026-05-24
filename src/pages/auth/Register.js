import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    avatar: null,
  });

  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= IMAGE =================
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, avatar: file });

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors = {};

    if (!form.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!form.email.trim())
      newErrors.email = "Email is required";

    if (!form.phone.trim())
      newErrors.phone = "Phone number is required";

    if (!form.password)
      newErrors.password = "Password is required";

    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("full_name", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("password", form.password);
      formData.append("role", form.role);

      if (form.avatar) {
        formData.append("avatar", form.avatar);
      }

      const res = await register(formData);

      if (!res || !res.success) {
        setErrors({
          general: res?.message || "Registration failed",
        });
        return;
      }

      // REDIRECT
      if (form.role === "provider") {
        navigate("/provider/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      setErrors({
        general: "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }

          @media (max-width: 900px) {
            .register-container {
              flex-direction: column;
            }

            .register-left {
              display: none !important;
            }

            .register-right {
              width: 100% !important;
              padding: 20px !important;
            }

            .register-card {
              width: 100% !important;
              max-width: 420px !important;
            }
          }

          @media (max-width: 500px) {
            .register-card {
              padding: 25px 20px !important;
            }

            .register-title {
              font-size: 26px !important;
            }
          }
        `}
      </style>

      {/* BACKGROUND GLOW */}
      <div style={bgGlow1}></div>
      <div style={bgGlow2}></div>

      {/* LEFT SIDE */}
      <div className="register-left" style={left}>
        <div style={brandBox}>
          <img
            src="/favicon2.png"
            alt="logo"
            style={leftLogo}
          />

          <h1 style={brand}>HomiCare</h1>
        </div>

        <p style={tagline}>
          Join the future of trusted home services and connect with
          professional service providers near you.
        </p>

        <div style={featureBox}>
          <div style={feature}>✔ Trusted Professionals</div>
          <div style={feature}>✔ Fast Booking Experience</div>
          <div style={feature}>✔ Secure Communication</div>
          <div style={feature}>✔ Affordable Home Services</div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="register-right" style={right}>
        <div className="register-card" style={card}>

          {/* LOGO */}
          <img
            src="/favicon2.png"
            alt="logo"
            style={logo}
          />

          <h2 className="register-title" style={title}>
            Create Account
          </h2>

          <p style={subtitle}>
            Register and start using HomiCare today
          </p>

          {/* GENERAL ERROR */}
          {errors.general && (
            <div style={generalError}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} style={formBox}>

            {/* IMAGE */}
            <div style={imageBox}>
              <img
                src={preview || defaultImg}
                alt="profile"
                style={avatar}
              />

              <label style={uploadBtn}>
                Upload Photo
                <input
                  type="file"
                  onChange={handleImage}
                  hidden
                />
              </label>
            </div>

            {/* ROLE */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={input}
            >
              <option value="customer">
                Customer
              </option>

              <option value="provider">
                Service Provider
              </option>
            </select>

            {/* FULL NAME */}
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                style={input}
              />

              {errors.fullName && (
                <small style={errorText}>
                  {errors.fullName}
                </small>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                style={input}
              />

              {errors.email && (
                <small style={errorText}>
                  {errors.email}
                </small>
              )}
            </div>

            {/* PHONE */}
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                style={input}
              />

              {errors.phone && (
                <small style={errorText}>
                  {errors.phone}
                </small>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                style={input}
              />

              {errors.password && (
                <small style={errorText}>
                  {errors.password}
                </small>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                style={input}
              />

              {errors.confirmPassword && (
                <small style={errorText}>
                  {errors.confirmPassword}
                </small>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              style={btn}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* FOOTER */}
          <p style={footer}>
            Already have an account?{" "}
            <Link to="/login" style={link}>
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  display: "flex",
  background: "linear-gradient(135deg,#f59e0b,#f97316)",
  overflow: "hidden",
  position: "relative",
  fontFamily: "Segoe UI, sans-serif",
};

const bgGlow1 = {
  position: "absolute",
  width: 400,
  height: 400,
  background: "rgba(255,255,255,0.15)",
  borderRadius: "50%",
  filter: "blur(120px)",
  top: "-100px",
  left: "-100px",
};

const bgGlow2 = {
  position: "absolute",
  width: 400,
  height: 400,
  background: "rgba(6,182,212,0.25)",
  borderRadius: "50%",
  filter: "blur(120px)",
  bottom: "-100px",
  right: "-100px",
};

/* LEFT */
const left = {
  flex: 1,
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "60px",
  zIndex: 2,
};

const brandBox = {
  display: "flex",
  alignItems: "center",
  gap: 20,
};

const leftLogo = {
  width: 75,
  animation: "float 3s ease-in-out infinite",
};

const brand = {
  fontSize: "58px",
  fontWeight: "800",
  margin: 0,
};

const tagline = {
  marginTop: 20,
  fontSize: "20px",
  lineHeight: 1.8,
  maxWidth: 500,
  opacity: 0.95,
};

const featureBox = {
  marginTop: 40,
  display: "flex",
  flexDirection: "column",
  gap: 15,
};

const feature = {
  background: "rgba(255,255,255,0.15)",
  padding: "14px 18px",
  borderRadius: 12,
  width: "fit-content",
  backdropFilter: "blur(10px)",
};

/* RIGHT */
const right = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  zIndex: 2,
};

/* CARD */
const card = {
  width: "100%",
  maxWidth: 430,
  background: "rgba(255,255,255,0.14)",
  backdropFilter: "blur(20px)",
  borderRadius: 25,
  padding: "35px 30px",
  boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
  color: "#fff",
  textAlign: "center",
};

const logo = {
  width: 85,
  height: 85,
  objectFit: "cover",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.2)",
  padding: 10,
  marginBottom: 10,
  animation: "float 3s ease-in-out infinite",
};

const title = {
  fontSize: 32,
  fontWeight: "bold",
  marginBottom: 5,
};

const subtitle = {
  opacity: 0.9,
  marginBottom: 25,
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

/* IMAGE */
const imageBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: 10,
};

const avatar = {
  width: 90,
  height: 90,
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid rgba(255,255,255,0.3)",
  marginBottom: 10,
};

const uploadBtn = {
  background: "rgba(255,255,255,0.2)",
  padding: "10px 18px",
  borderRadius: 10,
  cursor: "pointer",
  fontSize: 14,
};

/* INPUT */
const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.25)",
  background: "rgba(255,255,255,0.18)",
  color: "#fff",
  outline: "none",
  fontSize: 15,
  boxSizing: "border-box",
};

const btn = {
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: 14,
  background: "linear-gradient(135deg,#4F46E5,#06B6D4)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
  cursor: "pointer",
  marginTop: 10,
  transition: "0.3s",
};

const footer = {
  marginTop: 20,
  fontSize: 15,
};

const link = {
  color: "#fff",
  fontWeight: "bold",
  textDecoration: "none",
};

const errorText = {
  color: "#ffe4e6",
  fontSize: 13,
  display: "block",
  marginTop: 6,
  textAlign: "left",
};

const generalError = {
  background: "rgba(220,38,38,0.2)",
  padding: 12,
  borderRadius: 10,
  marginBottom: 20,
  fontSize: 14,
};

const defaultImg =
  "https://via.placeholder.com/150";