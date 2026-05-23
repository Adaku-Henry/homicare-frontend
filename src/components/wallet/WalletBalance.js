// src/pages/wallet/components/wallet/WalletBalance.js
import React from "react";
import "./WalletBalance.css";

function WalletBalance({ balance }) {
  return (
    <div className="wallet-balance">
      <h2>Current Balance</h2>
      <p>{balance.toLocaleString()} UGX</p>
    </div>
  );
}

export default WalletBalance;