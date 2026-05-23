import { useState, useEffect } from "react";
import {
  getDashboardStats,
} from "../api/analytics";

export default function useAnalytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const res = await getDashboardStats();
    setStats(res.data);
  };

  return { stats, loadStats };
}