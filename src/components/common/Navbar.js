import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
} from "react-icons/ai";

import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth() || {};
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);

  const handleLogout = () => {
    logout && logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">

        {/* LEFT */}
        <div className="navbar-left">
          <Link to="/" className="nav-logo">
            HomiCare
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="navbar-right desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/providers">Providers</Link>
          <Link to="/bookings">Bookings</Link>
          <Link to="/wallet">Wallet</Link>
        </div>

        {/* MOBILE ICONS */}
        <div className="mobile-icons">

          {/* ACCOUNT */}
          <button
            className="icon-btn"
            onClick={() => setAccountMenu(!accountMenu)}
          >
            <AiOutlineUser />
          </button>

          {/* MENU */}
          <button
            className="icon-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </nav>

      {/* MOBILE TOP NAVIGATION */}
      {mobileMenu && (
        <div className="mobile-menu">

          <Link to="/" onClick={() => setMobileMenu(false)}>
            Home
          </Link>

          <Link to="/services" onClick={() => setMobileMenu(false)}>
            Services
          </Link>

          <Link to="/categories" onClick={() => setMobileMenu(false)}>
            Categories
          </Link>

          <Link to="/providers" onClick={() => setMobileMenu(false)}>
            Providers
          </Link>

          <Link to="/wallet" onClick={() => setMobileMenu(false)}>
            Wallet
          </Link>

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      )}

      {/* ACCOUNT SIDEBAR */}
      {accountMenu && (
        <div className="account-sidebar">

          <div className="sidebar-header">
            <h3>
              {user?.fullName || "My Account"}
            </h3>
          </div>

          <Link to="/profile">My Profile</Link>

          <Link to="/provider/dashboard">
            Provider Dashboard
          </Link>

          <Link to="/bookings">
            My Bookings
          </Link>

          <Link to="/wallet">
            Wallet
          </Link>

          <Link to="/messages">
            Messages
          </Link>

          <Link to="/settings">
            Settings
          </Link>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;