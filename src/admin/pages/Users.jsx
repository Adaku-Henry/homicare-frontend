import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@mail.com", role: "User", status: "Active" },
  { id: 2, name: "Mary Jane", email: "mary@mail.com", role: "Provider", status: "Pending" },
];

export default function Users() {
  const [users] = useState(initialUsers);
  const [search, setSearch] = useState("");

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <h2>Users Management</h2>

      <input
        placeholder="Search users..."
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 10, marginBottom: 10 }}
      />

      <table width="100%" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}