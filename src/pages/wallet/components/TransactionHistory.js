// src/pages/wallet/components/TransactionHistory.js
import React from "react";
import "./TransactionHistory.css";

function TransactionHistory({ transactions }) {
  return (
    <div className="transaction-history">
      <h3>Transaction History</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Amount (UGX)</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, idx) => (
            <tr key={tx.id}>
              <td>{idx + 1}</td>
              <td>{tx.type}</td>
              <td>{tx.amount.toLocaleString()}</td>
              <td>{tx.date}</td>
              <td>{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;