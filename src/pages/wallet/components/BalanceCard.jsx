import React from "react";

const BalanceCard = ({ balance, currency, onTopUp, onWithdraw }) => {
  return (
    <div className="balance-card">
      <div>
        <h3>Available Balance</h3>
        <h1>
          {currency} {balance.toLocaleString()}
        </h1>
      </div>

      <div className="wallet-actions">
        <button className="btn topup" onClick={onTopUp}>
          + Top Up
        </button>
        <button className="btn withdraw" onClick={onWithdraw}>
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;