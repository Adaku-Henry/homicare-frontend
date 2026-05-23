import { useState, useEffect } from "react";
import {
  getProviders,
  getProvidersByCategory,
} from "../api/providers";

export default function useProviders() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    const res = await getProviders();
    setProviders(res.data);
  };

  const filterByCategory = async (category) => {
    const res = await getProvidersByCategory(category);
    setProviders(res.data);
  };

  return { providers, loadProviders, filterByCategory };
}