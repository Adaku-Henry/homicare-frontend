import { useState, useEffect } from "react";
import { getServices } from "../api/services";

export default function useServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const res = await getServices();
    setServices(res.data);
  };

  return { services, loadServices };
}