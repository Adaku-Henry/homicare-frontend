import React from "react";

const WalletStats = ({ wallet }) => {
  return (
    <div className="wallet-stats">

      <div>
        <h4>Income</h4>
        <p>UGX {wallet.income}</p>
      </div>

      <div>
        <h4>Expense</h4>
        <p>UGX {wallet.expense}</p>
      </div>

    </div>
  );
};

export default WalletStats;