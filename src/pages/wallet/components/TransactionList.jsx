import React from "react";
import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions }) => {
  return (
    <div className="transactions">
      <h3>Recent Transactions</h3>

      {transactions.map((tx) => (
        <TransactionItem key={tx.id} transaction={tx} />
      ))}
    </div>
  );
};

export default TransactionList;