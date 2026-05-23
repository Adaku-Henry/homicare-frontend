import React, { useState } from "react";

const TopUpFlow = ({ onClose, setStatus }) => {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    setStatus("Sending STK push to your phone...");

    try {
      const res = await fetch("/api/wallet/topup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, phone }),
      });

      const data = await res.json();

      setStatus("Check your phone and enter PIN to complete payment");

      setTimeout(() => {
        setStatus("Payment processing...");
      }, 3000);

    } catch (err) {
      setStatus("Payment failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h3>Top Up Wallet</h3>

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          placeholder="Phone (MTN/Airtel)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Send STK Push"}
        </button>

        <button onClick={onClose}>Cancel</button>

      </div>
    </div>
  );
};

export default TopUpFlow;