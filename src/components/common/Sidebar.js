import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

import {
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlineUser,
  AiOutlineTool,
  AiOutlineCustomerService,
  AiOutlineMessage,
  AiOutlineDashboard,
  AiOutlineTeam,
  AiOutlineWallet,
  AiOutlineBell,
  AiOutlineBook,
  AiOutlineSetting,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";

function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        className="mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      <div className={`sidebar ${mobileOpen ? "show" : ""}`}>

        {/* LOGO */}
        <div className="logo-section">
          <h2 className="logo">HomiCare</h2>

          <p className="logo-subtitle">
            Home Services Marketplace
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="sidebar-profile-card">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
          />

          <div className="info">
            <h4>Welcome Back</h4>
            <p>Customer Account</p>
          </div>

          <div className="stats">
            <span>12 Jobs</span>
            <span>4.9 ★</span>
          </div>

          <div className="actions">
            <Link to="/profile">
              <button>Profile</button>
            </Link>

            <Link to="/profile/edit">
              <button>Edit</button>
            </Link>
          </div>
        </div>

        {/* MENU */}
        <ul className="menu-list">

          {/* HOME */}
          <li className={isActive("/") ? "active" : ""}>
            <Link to="/">
              <AiOutlineHome />
              Home
            </Link>
          </li>

          {/* SERVICES */}
          <li className={isActive("/services") ? "active" : ""}>
            <Link to="/services">
              <AiOutlineAppstore />
              Services
            </Link>
          </li>

          {/* CATEGORIES */}
          <li>
            <button onClick={() => toggleMenu("categories")}>
              <span>
                <AiOutlineAppstore />
                Categories
              </span>

              <span>
                {activeMenu === "categories" ? "−" : "+"}
              </span>
            </button>

            {activeMenu === "categories" && (
              <ul className="submenu">
                <li>
                  <Link to="/provider/cleaning">Cleaning</Link>
                </li>

                <li>
                  <Link to="/provider/plumbing">Plumbing</Link>
                </li>

                <li>
                  <Link to="/provider/electrical">Electrical</Link>
                </li>

                <li>
                  <Link to="/provider/laundry">Laundry</Link>
                </li>

                <li>
                  <Link to="/provider/babysitting">Babysitting</Link>
                </li>
              </ul>
            )}
          </li>

          {/* ACCOUNT */}
          <li>
            <button onClick={() => toggleMenu("account")}>
              <span>
                <AiOutlineUser />
                My Account
              </span>

              <span>
                {activeMenu === "account" ? "−" : "+"}
              </span>
            </button>

            {activeMenu === "account" && (
              <ul className="submenu">

                <li className="submenu-title">
                  CUSTOMER
                </li>

                <li>
                  <Link to="/profile">
                    <AiOutlineDashboard />
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link to="/bookings">
                    <AiOutlineBook />
                    My Bookings
                  </Link>
                </li>

                <li>
                  <Link to="/wallet">
                    <AiOutlineWallet />
                    Wallet
                  </Link>
                </li>

                <li>
                  <Link to="/messages">
                    <AiOutlineMessage />
                    Messages
                  </Link>
                </li>

                <li className="submenu-title">
                  SETTINGS
                </li>

                <li>
                  <Link to="/profile/edit">
                    <AiOutlineUser />
                    Edit Profile
                  </Link>
                </li>

                <li>
                  <Link to="/profile/notifications">
                    <AiOutlineBell />
                    Notifications
                  </Link>
                </li>

                <li>
                  <Link to="/profile/preferences">
                    <AiOutlineSetting />
                    Preferences
                  </Link>
                </li>

                <li>
                  <Link to="/profile/security">
                    <AiOutlineSetting />
                    Security
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* PROVIDER */}
          <li>
            <button onClick={() => toggleMenu("provider")}>
              <span>
                <AiOutlineDashboard />
                Provider
              </span>

              <span>
                {activeMenu === "provider" ? "−" : "+"}
              </span>
            </button>

            {activeMenu === "provider" && (
              <ul className="submenu">

                <li>
                  <Link to="/provider/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link to="/provider/profile">
                    Provider Profile
                  </Link>
                </li>

                <li>
                  <Link to="/provider/profile/edit">
                    Edit Profile
                  </Link>
                </li>

                <li>
                  <Link to="/provider/jobs">
                    Jobs
                  </Link>
                </li>

                <li>
                  <Link to="/provider/earnings">
                    Earnings
                  </Link>
                </li>

                <li>
                  <Link to="/provider/reviews">
                    Reviews
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* ADMIN */}
          <li>
            <button onClick={() => toggleMenu("admin")}>
              <span>
                <AiOutlineTeam />
                Admin
              </span>

              <span>
                {activeMenu === "admin" ? "−" : "+"}
              </span>
            </button>

            {activeMenu === "admin" && (
              <ul className="submenu">
                <li>
                  <Link to="/admin/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link to="/admin/users">
                    Users
                  </Link>
                </li>

                <li>
                  <Link to="/admin/providers">
                    Providers
                  </Link>
                </li>

                <li>
                  <Link to="/admin/bookings">
                    Bookings
                  </Link>
                </li>

                <li>
                  <Link to="/admin/analytics">
                    Analytics
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* TOOLS */}
          <li>
            <button onClick={() => toggleMenu("tools")}>
              <span>
                <AiOutlineTool />
                Tools
              </span>

              <span>
                {activeMenu === "tools" ? "−" : "+"}
              </span>
            </button>

            {activeMenu === "tools" && (
              <ul className="submenu">
                <li>
                  <Link to="/tools/wallet-topup">
                    Wallet Top-up
                  </Link>
                </li>

                <li>
                  <Link to="/tools/help">
                    Help Center
                  </Link>
                </li>

                <li>
                  <Link to="/support/ai">
                    AI Assistant
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* SUPPORT */}
          <li>
            <button onClick={() => toggleMenu("support")}>
              <span>
                <AiOutlineCustomerService />
                Support
              </span>

              <span>
                {activeMenu === "support" ? "−" : "+"}
              </span>
            </button>

            {activeMenu === "support" && (
              <ul className="submenu">
                <li>
                  <Link to="/support">
                    Support Home
                  </Link>
                </li>

                <li>
                  <Link to="/support/help">
                    Help Center
                  </Link>
                </li>

                <li>
                  <Link to="/support/contact">
                    Contact Support
                  </Link>
                </li>

                <li>
                  <Link to="/support/tickets">
                    Tickets
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* CHAT */}
          <li className={isActive("/messages") ? "active" : ""}>
            <Link to="/messages">
              <AiOutlineMessage />
              Chat
            </Link>
          </li>

        </ul>
      </div>
    </>
  );
}

export default Sidebar;