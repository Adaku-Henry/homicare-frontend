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

    if (!form.fullName) newErrors.fullName = "Full name required";
    if (!form.email) newErrors.email = "Email required";
    if (!form.phone) newErrors.phone = "Phone required";
    if (!form.password) newErrors.password = "Password required";
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
        setErrors({ general: res?.message || "Registration failed" });
        return;
      }

      // 🔥 AUTO REDIRECT BASED ON ROLE
      if (form.role === "provider") {
        navigate("/provider/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      setErrors({ general: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>

      {/* LEFT PANEL */}
      <div style={left}>
        <h1>HomiCare</h1>
        <p>Join the future of home services</p>
      </div>

      {/* RIGHT PANEL */}
      <div style={right}>
        <div style={card}>

          <h2>Create Account</h2>

          {errors.general && <p style={error}>{errors.general}</p>}

          <form onSubmit={handleSubmit} style={formBox}>

            {/* IMAGE */}
            <div style={imageBox}>
              <img src={preview || defaultImg} style={avatar} />
              <input type="file" onChange={handleImage} />
            </div>

            {/* ROLE SELECT */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={input}
            >
              <option value="customer">Customer</option>
              <option value="provider">Service Provider</option>
            </select>

            <input name="fullName" placeholder="Full Name" onChange={handleChange} style={input} />
            <input name="email" placeholder="Email" onChange={handleChange} style={input} />
            <input name="phone" placeholder="Phone" onChange={handleChange} style={input} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} style={input} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} style={input} />

            <button style={btn}>
              {loading ? "Creating..." : "Create Account"}
            </button>

          </form>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;

/* ================= STYLES ================= */

const container = {
  display: "flex",
  minHeight: "100vh",
  background: "linear-gradient(135deg,#667eea,#764ba2)",
};

const left = {
  flex: 1,
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const right = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "rgba(255,255,255,0.15)",
  padding: 30,
  borderRadius: 20,
  backdropFilter: "blur(10px)",
  width: 350,
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const input = {
  padding: 10,
  borderRadius: 10,
  border: "none",
};

const btn = {
  padding: 12,
  background: "#00c853",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};

const avatar = {
  width: 80,
  height: 80,
  borderRadius: "50%",
};

const imageBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const error = { color: "red" };

const defaultImg = "https://via.placeholder.com/100";