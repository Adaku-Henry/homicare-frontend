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
} from "react-icons/ai";

function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">

      {/* ================= LOGO ================= */}
      <h2 className="logo">HomiCare</h2>

      <ul className="menu-list">

        {/* ================= HOME ================= */}
        <li className={isActive("/") ? "active" : ""}>
          <Link to="/">
            <AiOutlineHome /> Home
          </Link>
        </li>

        {/* ================= CATEGORIES ================= */}
        <li>
          <button onClick={() => toggleMenu("categories")}>
            <AiOutlineAppstore /> Categories
          </button>

          {activeMenu === "categories" && (
            <ul className="submenu">
              <li><Link to="/categories/cleaning">Cleaning</Link></li>
              <li><Link to="/categories/plumbing">Plumbing</Link></li>
              <li><Link to="/categories/electrical">Electrical</Link></li>
              <li><Link to="/categories/laundry">Laundry</Link></li>
              <li><Link to="/categories/babysitting">Babysitting</Link></li>
            </ul>
          )}
        </li>

        {/* ================= MY ACCOUNT ================= */}
        <li>
          <button onClick={() => toggleMenu("profile")}>
            <AiOutlineUser /> My Account
          </button>

          {activeMenu === "profile" && (
            <ul className="submenu">
              <li><Link to="/provider/profile">My Profile</Link></li>
              <li><Link to="/provider/profile/edit">Edit Profile</Link></li>
              <li><Link to="/booking">Book Service</Link></li>
              <li><Link to="/bookings">My Bookings</Link></li>
              <li><Link to="/wallet">Wallet</Link></li>
              <li><Link to="/profile/notifications">Notifications</Link></li>
              <li><Link to="/profile/preferences">Preferences</Link></li>
              <li><Link to="/provider/dashboard">Provider Dashboard</Link></li>
            </ul>
          )}
        </li>

        {/* ================= PROVIDER ================= */}
        <li>
          <button onClick={() => toggleMenu("provider")}>
            <AiOutlineDashboard /> Provider Dashboard
          </button>

          {activeMenu === "provider" && (
            <ul className="submenu">
              <li><Link to="/provider/dashboard">Dashboard</Link></li>
              <li><Link to="/provider/profile">Provider Profile</Link></li>
              <li><Link to="/provider/profile/edit">Edit Profile</Link></li>
              <li><Link to="/provider/jobs">Jobs</Link></li>
              <li><Link to="/provider/earnings">Earnings</Link></li>
              <li><Link to="/provider/reviews">Reviews</Link></li>
            </ul>
          )}
        </li>

        {/* ================= ADMIN ================= */}
        <li>
          <button onClick={() => toggleMenu("admin")}>
            <AiOutlineTeam /> Admin Panel
          </button>

          {activeMenu === "admin" && (
            <ul className="submenu">
              <li><Link to="/admin/dashboard">Dashboard</Link></li>
              <li><Link to="/admin/users">Users</Link></li>
              <li><Link to="/admin/providers">Providers</Link></li>
              <li><Link to="/admin/bookings">Bookings</Link></li>
              <li><Link to="/admin/analytics">Analytics</Link></li>
            </ul>
          )}
        </li>

        {/* ================= CHAT ================= */}
        <li className={isActive("/messages") ? "active" : ""}>
          <Link to="/messages">
            <AiOutlineMessage /> Chat
          </Link>
        </li>

        {/* ================= TOOLS ================= */}
        <li>
          <button onClick={() => toggleMenu("tools")}>
            <AiOutlineTool /> Tools
          </button>

          {activeMenu === "tools" && (
            <ul className="submenu">
              <li><Link to="/tools/wallet-topup">Wallet Top-up</Link></li>
              <li><Link to="/tools/help">Help Center</Link></li>
              <li><Link to="/tools/ai">AI Assistant</Link></li>
            </ul>
          )}
        </li>

        {/* ================= SUPPORT ================= */}
        <li>
          <button onClick={() => toggleMenu("support")}>
            <AiOutlineCustomerService /> Support
          </button>

          {activeMenu === "support" && (
            <ul className="submenu">
              <li><Link to="/support">Support Home</Link></li>
              <li><Link to="/support/help">Help Center</Link></li>
              <li><Link to="/support/contact">Contact</Link></li>
              <li><Link to="/support/tickets">Tickets</Link></li>
              <li><Link to="/support/ai">AI Support</Link></li>
            </ul>
          )}
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;