import React from "react";

function UserFilters({ search, setSearch, roleFilter, setRoleFilter }) {
  return (
    <div className="flex gap-3 mb-4">

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-1/2"
      />

      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="all">All Roles</option>
        <option value="user">User</option>
        <option value="provider">Provider</option>
        <option value="admin">Admin</option>
      </select>

    </div>
  );
}

export default UserFilters;