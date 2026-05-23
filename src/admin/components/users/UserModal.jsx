import React from "react";

function UserModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white p-6 rounded w-96">

        <h2 className="text-xl font-bold mb-3">User Details</h2>

        <p><b>Name:</b> {user.fullName}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
        <p><b>Status:</b> {user.status}</p>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default UserModal;