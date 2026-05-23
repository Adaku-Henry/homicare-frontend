import React from "react";

const WalletSummary = ({ wallet }) => {
  return (
    <div className="wallet-summary">
      <div>
        <h4>Total In</h4>
        <p className="green">UGX {wallet.totalIn.toLocaleString()}</p>
      </div>

      <div>
        <h4>Total Out</h4>
        <p className="red">UGX {wallet.totalOut.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default WalletSummary;