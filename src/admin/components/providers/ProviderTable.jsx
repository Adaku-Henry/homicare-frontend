import React from "react";

export default function ProviderTable({
  data = [],   // ✅ DEFAULT VALUE FIX
  onSelect,
  onApprove,
  onReject,
  onVerify
}) {

  const safeData = Array.isArray(data) ? data : [];

  const getStatusColor = (status) => {
    if (status === "Approved") return "green";
    if (status === "Pending") return "orange";
    if (status === "Rejected") return "red";
    if (status === "Active") return "blue";
    return "gray";
  };

  return (
    <table width="100%" border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Rating</th>
          <th>Jobs</th>
          <th>Status</th>
          <th>Verified</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {safeData.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>
              No providers found
            </td>
          </tr>
        ) : (
          safeData.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.rating}</td>
              <td>{p.jobs}</td>

              <td style={{ color: getStatusColor(p.status) }}>
                {p.status}
              </td>

              <td>{p.verified ? "✅" : "❌"}</td>

              <td>
                <button onClick={() => onSelect(p)}>View</button>

                {p.status === "Pending" && (
                  <>
                    <button onClick={() => onApprove(p.id)}>Approve</button>
                    <button onClick={() => onReject(p.id)}>Reject</button>
                  </>
                )}

                {p.status === "Approved" && !p.verified && (
                  <button onClick={() => onVerify(p.id)}>
                    Verify
                  </button>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}