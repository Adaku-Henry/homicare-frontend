import React from "react";

function ProviderFilters({ search, setSearch, statusFilter, setStatusFilter }) {
  return (
    <div className="flex gap-3 mb-4">

      <input
        placeholder="Search providers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-1/2"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="suspended">Suspended</option>
      </select>

    </div>
  );
}

export default ProviderFilters;