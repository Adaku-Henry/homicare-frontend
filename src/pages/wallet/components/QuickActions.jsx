import React from "react";

const QuickActions = ({ onTopUp, onWithdraw }) => {
  return (
    <div className="quick-actions">
      <button className="btn topup" onClick={onTopUp}>
        💳 Top Up
      </button>

      <button className="btn withdraw" onClick={onWithdraw}>
        💸 Withdraw
      </button>
    </div>
  );
};

export default QuickActions;