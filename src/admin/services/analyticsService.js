export const getAnalytics = async () => {
  const res = await fetch("/api/admin/analytics");
  return res.json();
};