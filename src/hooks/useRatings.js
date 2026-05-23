import { useState } from "react";
import {
  getProviderRatings,
  addRating,
} from "../api/ratings";

export default function useRatings() {
  const [ratings, setRatings] = useState([]);

  const loadRatings = async (providerId) => {
    const res = await getProviderRatings(providerId);
    setRatings(res.data);
  };

  const add = async (data) => {
    await addRating(data);
  };

  return { ratings, loadRatings, add };
}