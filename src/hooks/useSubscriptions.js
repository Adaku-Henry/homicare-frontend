import { useState, useEffect } from "react";
import {
  getPlans,
  subscribe,
} from "../api/subscriptions";

export default function useSubscriptions() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const res = await getPlans();
    setPlans(res.data);
  };

  const subscribeUser = async (data) => {
    await subscribe(data);
  };

  return { plans, loadPlans, subscribeUser };
}