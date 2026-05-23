import React, { useState } from "react";

const WithdrawModal = ({ onClose }) => {
  const [amount, setAmount] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Withdraw Funds</h3>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input type="text" placeholder="Bank / Mobile Number" />

        <button>Request Withdrawal</button>
        <button onClick={onClose} className="cancel">Cancel</button>
      </div>
    </div>
  );
};

export default WithdrawModal;