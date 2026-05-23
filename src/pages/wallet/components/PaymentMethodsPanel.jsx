import React from "react";

const PaymentMethodsPanel = ({ onClose, openTopUp }) => {

  const ussdMTN = "*165*3#";
  const ussdAirtel = "*185*9#";

  const openDial = (code) => {
    window.location.href = `tel:${code}`;
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h3>Select Payment Method</h3>

        {/* STK OPTION */}
        <button onClick={openTopUp} className="method-btn stk">
          💳 Mobile Money (STK Push)
        </button>

        {/* USSD MTN */}
        <button onClick={() => openDial(ussdMTN)} className="method-btn ussd">
          📲 MTN USSD (*165*3#)
        </button>

        {/* USSD AIRTEL */}
        <button onClick={() => openDial(ussdAirtel)} className="method-btn ussd">
          📲 Airtel USSD (*185*9#)
        </button>

        {/* BANK */}
        <button className="method-btn bank">
          🏦 Bank Deposit Details
        </button>

        {/* CANCEL */}
        <button onClick={onClose} className="cancel-btn">
          Close
        </button>

      </div>
    </div>
  );
};

export default PaymentMethodsPanel;