import { useState } from "react";
import { changePasswordAPI } from "../services/securityAPI";

const SecuritySettings = () => {
  const [password, setPassword] = useState("");

  const handleChange = async () => {
    await changePasswordAPI({ password });
    alert("Password updated!");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">Security Settings</h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="w-full p-2 border mb-2"
        />

        <button
          onClick={handleChange}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Update Password
        </button>

      </div>
    </div>
  );
};

export default SecuritySettings;