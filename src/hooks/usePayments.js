import { initiatePayment, getPaymentHistory } from "../api/payments";
import { useState, useEffect } from "react";

export default function usePayments() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const res = await getPaymentHistory();
    setHistory(res.data);
  };

  const pay = async (data) => {
    await initiatePayment(data);
  };

  return { history, loadHistory, pay };
}