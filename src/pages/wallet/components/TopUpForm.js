import React, { useState } from "react";
import "./TopUpForm.css";

function TopUpForm({ onTopUp }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Mobile Money");

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericAmount = parseInt(amount);
    if (!numericAmount || numericAmount <= 0) return;

    onTopUp(numericAmount, method);
    setAmount("");
  };

  return (
    <form className="topup-form" onSubmit={handleSubmit}>
      <h3>Top-Up Wallet</h3>

      <input
        type="number"
        placeholder="Enter amount (UGX)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="payment-methods">
        <label>
          <input
            type="radio"
            value="Mobile Money"
            checked={method === "Mobile Money"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Mobile Money
        </label>
        <label>
          <input
            type="radio"
            value="Card"
            checked={method === "Card"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Card
        </label>
      </div>

      <button type="submit">Top Up</button>
    </form>
  );
}

export default TopUpForm;