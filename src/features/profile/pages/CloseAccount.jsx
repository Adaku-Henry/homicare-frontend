import { useState } from "react";

const CloseAccount = () => {
  const [confirm, setConfirm] = useState(false);

  const handleClose = () => {
    alert("Account closed (simulation)");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">

      <div className="bg-white p-4 rounded-xl shadow border border-red-200">

        <h2 className="text-xl font-bold text-red-600 mb-3">
          Close Account
        </h2>

        <p className="text-gray-600 mb-4">
          This action is permanent. You will lose all your data.
        </p>

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={confirm}
            onChange={() => setConfirm(!confirm)}
          />
          I understand this action cannot be undone
        </label>

        <button
          disabled={!confirm}
          onClick={handleClose}
          className={`px-4 py-2 rounded text-white ${
            confirm ? "bg-red-600" : "bg-gray-400"
          }`}
        >
          Close My Account
        </button>

      </div>
    </div>
  );
};

export default CloseAccount;