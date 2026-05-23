import React, { useState } from "react";
import { providerRequests } from "../data/providerRequests";

export default function Providers() {
  const [providers, setProviders] = useState(providerRequests);
  const [filter, setFilter] = useState("all");

  // ================= APPROVE =================
  const approveProvider = (id) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "approved" } : p
      )
    );
  };

  // ================= REJECT =================
  const rejectProvider = (id) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "rejected" } : p
      )
    );
  };

  // ================= FILTER =================
  const filteredProviders = providers.filter((p) => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  return (
    <div style={container}>
      <h2>Provider Approval System</h2>

      {/* FILTER BUTTONS */}
      <div style={filters}>
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...filterBtn,
              background: filter === f ? "#2d7ff9" : "#eee",
              color: filter === f ? "#fff" : "#000",
            }}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <table style={table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Location</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProviders.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.service}</td>
              <td>{p.location}</td>
              <td>{p.rating}</td>
              <td>
                <span style={{ ...badge, background: getColor(p.status) }}>
                  {p.status}
                </span>
              </td>

              <td>
                {p.status === "pending" && (
                  <>
                    <button
                      onClick={() => approveProvider(p.id)}
                      style={approveBtn}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectProvider(p.id)}
                      style={rejectBtn}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ================= COLOR FUNCTION =================
function getColor(status) {
  if (status === "approved") return "green";
  if (status === "rejected") return "red";
  return "orange";
}

// ================= STYLES =================
const container = { padding: 20 };

const filters = {
  display: "flex",
  gap: 10,
  marginBottom: 20,
};

const filterBtn = {
  padding: "8px 12px",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const table = {
  width: "100%",
  background: "#fff",
  borderCollapse: "collapse",
};

const badge = {
  padding: "4px 8px",
  borderRadius: 6,
  color: "#fff",
};

const approveBtn = {
  marginRight: 5,
  background: "green",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
};

const rejectBtn = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
};