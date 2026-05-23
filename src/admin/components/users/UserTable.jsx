import React from "react";
import { deleteUser, updateUserStatus } from "../../services/userService";

function UserTable({ users, onView, refresh }) {

  const toggleStatus = async (user) => {
    const newStatus = user.status === "active" ? "blocked" : "active";
    await updateUserStatus(user.id, newStatus);
    refresh();
  };

  const removeUser = async (id) => {
    await deleteUser(id);
    refresh();
  };

  return (
    <table className="w-full border bg-white">

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map(user => (
          <tr key={user.id} className="border-t">

            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>

            <td>
              <span
                style={{
                  color: user.status === "active" ? "green" : "red"
                }}
              >
                {user.status}
              </span>
            </td>

            <td className="flex gap-2">

              <button onClick={() => onView(user)}>
                View
              </button>

              <button onClick={() => toggleStatus(user)}>
                {user.status === "active" ? "Block" : "Unblock"}
              </button>

              <button onClick={() => removeUser(user.id)}>
                Delete
              </button>

            </td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default UserTable;