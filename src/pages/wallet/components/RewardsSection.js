import React from "react";
import "./RewardsSection.css";

function RewardsSection({ rewards }) {
  return (
    <div className="rewards-section">
      <h3>Rewards & Bonuses</h3>
      <div className="rewards-list">
        {rewards.map((r) => (
          <div key={r.id} className={`reward-card ${r.claimed ? "claimed" : "unclaimed"}`}>
            <p>{r.description}</p>
            <span>{r.amount.toLocaleString()} UGX</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RewardsSection;