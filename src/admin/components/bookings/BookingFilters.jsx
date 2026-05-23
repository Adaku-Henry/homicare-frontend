import React from "react";

export default function BookingFilters({ setFilter }) {
  return (
    <div style={{ marginBottom: 15 }}>

      <button onClick={() => setFilter("All")}>All</button>
      <button onClick={() => setFilter("Pending")}>Pending</button>
      <button onClick={() => setFilter("Active")}>Active</button>
      <button onClick={() => setFilter("Completed")}>Completed</button>
      <button onClick={() => setFilter("Cancelled")}>Cancelled</button>

    </div>
  );
}