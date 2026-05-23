// src/components/common/FooterNav.js
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineAppstore, AiOutlineHome, AiOutlinePlayCircle, AiOutlineUser, AiOutlineWallet } from "react-icons/ai";
import "./FooterNav.css";

function FooterNav() {
  return (
    <div className="bottom-nav">
      <Link to="/"><AiOutlineHome /> <span>Home</span></Link>
      <Link to="/categories"><AiOutlineAppstore /> <span>Categories</span></Link>
      <Link to="/account/inbox"><AiOutlineUser /> <span>Account</span></Link>
      <Link to="/wallet"><AiOutlineWallet /> <span>Wallet</span></Link>
      <Link to="/listening/playlists"><AiOutlinePlayCircle /> <span>Listening</span></Link>
    </div>
  );
}

export default FooterNav;