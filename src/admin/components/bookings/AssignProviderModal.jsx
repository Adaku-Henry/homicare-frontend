import React, { useEffect, useState } from "react";

function AssignProviderModal({ booking, onAssign, onClose }) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetch("/api/providers")
      .then(res => res.json())
      .then(data => setProviders(data));
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white p-6 rounded w-96">

        <h2 className="text-xl font-bold mb-3">
          Assign Provider
        </h2>

        <p>Service: {booking.service}</p>

        <div className="mt-3">
          {providers.map(p => (
            <div
              key={p.id}
              className="border p-2 mb-2 cursor-pointer"
              onClick={() => onAssign(p.id)}
            >
              {p.fullName} - ⭐ {p.rating}
            </div>
          ))}
        </div>

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

export default AssignProviderModal;