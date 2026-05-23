import React from "react";
import "./QuickWalletSummary.css";

function QuickWalletSummary({ balance, transactions }) {
  return (
    <div className="quick-wallet-summary">
      <h4>Wallet Summary</h4>
      <p className="balance">Balance: {balance.toLocaleString()} UGX</p>

      <div className="transactions-scroll">
        {transactions.slice(0, 5).map((t) => (
          <div key={t.id} className="transaction-card">
            <span className="type">{t.type}</span>
            <span className="amount">{t.amount.toLocaleString()} UGX</span>
            <span className="status">{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickWalletSummary;