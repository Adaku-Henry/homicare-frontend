import { useState, useEffect } from "react";
import {
  getReports,
  generateReport,
} from "../api/reports";

export default function useReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const res = await getReports();
    setReports(res.data);
  };

  const generate = async (data) => {
    await generateReport(data);
    loadReports();
  };

  return { reports, generate };
}