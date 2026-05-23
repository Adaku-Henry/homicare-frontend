import API from "./axios";

export const generateReport = (data) =>
  API.post("/reports/generate/", data);

export const getReports = () => API.get("/reports/");