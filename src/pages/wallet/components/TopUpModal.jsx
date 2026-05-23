import React, { useState } from "react";

const TopUpModal = ({ onClose }) => {
  const [amount, setAmount] = useState("");

  const handleTopUp = () => {
    alert(`Topping up UGX ${amount}`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Top Up Wallet</h3>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleTopUp}>Proceed</button>
        <button onClick={onClose} className="cancel">Cancel</button>
      </div>
    </div>
  );
};

export default TopUpModal;