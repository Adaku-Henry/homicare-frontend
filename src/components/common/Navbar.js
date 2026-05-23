import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext"; // ✅ FIXED

function Navbar() {
  const { user, logout } = useAuth() || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    logout && logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-logo">HomiCare</Link>
      </div>

      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/providers">Providers</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/account/inbox">Inbox</Link>
        <Link to="/wallet">Wallet</Link>

        {/* ✅ AUTH SECTION */}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="nav-user">
               {user?.fullName || user?.name || "User"}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;