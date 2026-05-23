import React from "react";

function ProviderModal({ provider, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      <div className="bg-white p-6 rounded w-96">

        <h2 className="text-xl font-bold mb-3">Provider Details</h2>

        <p><b>Name:</b> {provider.fullName}</p>
        <p><b>Email:</b> {provider.email}</p>
        <p><b>Status:</b> {provider.status}</p>
        <p><b>Rating:</b> ⭐ {provider.rating}</p>
        <p><b>Jobs Completed:</b> {provider.jobs || 0}</p>

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

export default ProviderModal;