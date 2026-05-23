import React, { useState } from "react";
import "./WalletPage.css";

import BalanceCard from "./components/BalanceCard";
import TransactionList from "./components/TransactionList";
import TopUpModal from "./components/TopUpModal";
import WithdrawModal from "./components/WithdrawModal";
import WalletSummary from "./components/WalletSummary";
import PaymentMethodsPanel from "./components/PaymentMethodsPanel";

const Wallet = () => {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showMethods, setShowMethods] = useState(false);

  const [wallet] = useState({
    balance: 125000,
    currency: "UGX",
    totalIn: 300000,
    totalOut: 175000,
  });

  const [transactions] = useState([
    { id: 1, type: "credit", amount: 50000, note: "MTN Topup", date: "2026-04-10" },
    { id: 2, type: "debit", amount: 20000, note: "Service Payment", date: "2026-04-11" },
    { id: 3, type: "credit", amount: 100000, note: "Bank Deposit", date: "2026-04-12" },
  ]);

  return (
    <div className="wallet-container">

      {/* HEADER */}
      <div className="wallet-header">
        <h2>My Wallet</h2>
        <p>Manage your balance, payments and withdrawals</p>
      </div>

      {/* BALANCE */}
      <BalanceCard
        balance={wallet.balance}
        currency={wallet.currency}
        onTopUp={() => setShowMethods(true)}
        onWithdraw={() => setShowWithdraw(true)}
      />

      {/* SUMMARY */}
      <WalletSummary wallet={wallet} />

      {/* PAYMENT METHODS PANEL */}
      {showMethods && (
        <PaymentMethodsPanel
          onClose={() => setShowMethods(false)}
          openTopUp={() => setShowTopUp(true)}
        />
      )}

      {/* TRANSACTIONS */}
      <TransactionList transactions={transactions} />

      {/* MODALS */}
      {showTopUp && (
        <TopUpModal onClose={() => setShowTopUp(false)} />
      )}

      {showWithdraw && (
        <WithdrawModal onClose={() => setShowWithdraw(false)} />
      )}
    </div>
  );
};

export default Wallet;