import React from "react";

const TransactionItem = ({ transaction }) => {
  return (
    <div className={`tx-item ${transaction.type}`}>
      <div>
        <p>{transaction.note}</p>
        <small>{transaction.date}</small>
      </div>

      <div className="amount">
        {transaction.type === "credit" ? "+" : "-"}
        UGX {transaction.amount.toLocaleString()}
      </div>
    </div>
  );
};

export default TransactionItem;