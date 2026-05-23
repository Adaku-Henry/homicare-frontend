import { useState, useEffect } from "react";
import {
  getWallet,
  topUpWallet,
  getTransactions,
} from "../api/wallet";

export default function useWallet() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadWallet();
    loadTransactions();
  }, []);

  const loadWallet = async () => {
    const res = await getWallet();
    setWallet(res.data);
  };

  const loadTransactions = async () => {
    const res = await getTransactions();
    setTransactions(res.data);
  };

  const topup = async (data) => {
    await topUpWallet(data);
    loadWallet();
  };

  return {
    wallet,
    transactions,
    topup,
    loadWallet,
  };
}