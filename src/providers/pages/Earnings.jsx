import React, { useState, useMemo } from "react";
import { providersData } from "../data/providerData";

export default function Earnings() {
  // ✅ SAFE provider fallback
  const provider = providersData?.[0] || {};

  // ================= MOCK EARNINGS DATA =================
  const [earningsData] = useState([
    { month: "Jan", income: 120000 },
    { month: "Feb", income: 150000 },
    { month: "Mar", income: 100000 },
    { month: "Apr", income: 180000 },
    { month: "May", income: 220000 },
    { month: "Jun", income: 190000 },
  ]);

  // ================= TOTAL EARNINGS =================
  const totalEarnings = useMemo(() => {
    return earningsData.reduce((sum, item) => sum + item.income, 0);
  }, [earningsData]);

  const avgMonthly = Math.floor(totalEarnings / earningsData.length);

  const bestMonth = earningsData.reduce((prev, current) =>
    prev.income > current.income ? prev : current
  );

  return (
    <div style={container}>

      <div style={header}>
        <h2>Earnings Dashboard</h2>
        <p>Track your income performance and growth</p>
      </div>

      {/* ================= STATS ================= */}
      <div style={statsGrid}>

        <StatCard
          title="Total Earnings"
          value={`UGX ${totalEarnings}`}
          color="#2d7ff9"
        />

        <StatCard
          title="Average Monthly"
          value={`UGX ${avgMonthly}`}
          color="#00c853"
        />

        <StatCard
          title="Best Month"
          value={bestMonth.month}
          color="#ff9800"
        />

        <StatCard
          title="Completed Jobs"
          value={provider.completedJobs || 0}
          color="#9c27b0"
        />
      </div>

      {/* ================= CHART ================= */}
      <div style={chartContainer}>
        <h3>Monthly Earnings Overview</h3>

        <div style={chart}>
          {earningsData.map((item, index) => {
            const height = (item.income / 250000) * 200;

            return (
              <div key={index} style={barContainer}>
                <div style={{ ...bar, height: `${height}px` }} />
                <small>{item.month}</small>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div style={tableSection}>
        <h3>Income Breakdown</h3>

        <table style={table}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {earningsData.map((item, i) => (
              <tr key={i}>
                <td>{item.month}</td>
                <td>{item.income}</td>
                <td style={{ color: "green" }}>Completed</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= INSIGHTS ================= */}
      <div style={insights}>
        <h3>Performance Insights</h3>

        <ul>
          <li>📈 Income is growing steadily</li>
          <li>💡 Best month: {bestMonth.month}</li>
          <li>⚡ Focus on high-value jobs</li>
          <li>🎯 Maintain strong ratings</li>
        </ul>
      </div>

    </div>
  );
}

/* ================= COMPONENT ================= */
function StatCard({ title, value, color }) {
  return (
    <div style={{ ...card, borderLeft: `5px solid ${color}` }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

/* ================= STYLES ================= */

const container = { padding: 20, background: "#f4f6fb", minHeight: "100vh" };
const header = { marginBottom: 20 };

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 15,
};

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
};

const chartContainer = {
  marginTop: 30,
  background: "#fff",
  padding: 20,
  borderRadius: 10,
};

const chart = {
  display: "flex",
  alignItems: "flex-end",
  gap: 15,
  height: 220,
  marginTop: 20,
};

const barContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const bar = {
  width: 30,
  background: "#2d7ff9",
  borderRadius: 5,
};

const tableSection = {
  marginTop: 30,
  background: "#fff",
  padding: 20,
  borderRadius: 10,
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const insights = {
  marginTop: 30,
  background: "#fff",
  padding: 20,
  borderRadius: 10,
};