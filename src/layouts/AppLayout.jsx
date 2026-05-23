import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import FooterNav from "../components/common/FooterNav";
import "../styles/layout.css";

const AppLayout = () => {
  return (
    <div className="app-layout">

      {/* SIDEBAR */}
      <aside className="sidebar-container">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="main-area">

        {/* TOP NAVBAR */}
        <header className="topbar">
          <Navbar />
        </header>

        {/* PAGE CONTENT */}
        <main className="page-content">
          <Outlet />
        </main>

        {/* MOBILE FOOTER */}
        <FooterNav />

      </div>

    </div>
  );
};

export default AppLayout;