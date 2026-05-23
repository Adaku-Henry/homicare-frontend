import React, { useState } from "react";

const WithdrawFlow = ({ onClose, setStatus }) => {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  const handleWithdraw = async () => {
    setStatus("Processing withdrawal...");

    await fetch("/api/wallet/withdraw/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, phone }),
    });

    setStatus("Withdrawal request sent");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h3>Withdraw Funds</h3>

        <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
        <input placeholder="Phone number" onChange={(e) => setPhone(e.target.value)} />

        <button onClick={handleWithdraw}>Withdraw</button>
        <button onClick={onClose}>Cancel</button>

      </div>
    </div>
  );
};

export default WithdrawFlow;