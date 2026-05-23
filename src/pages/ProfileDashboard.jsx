import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return <p className="p-4">Loading profile...</p>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER CARD */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">

        <img
          src={user.avatar || "/default-avatar.png"}
          className="w-20 h-20 rounded-full object-cover border"
          alt="profile"
        />

        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

      </div>

      {/* ACTION MENU */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-white p-4 rounded-xl shadow space-y-2">

          <button onClick={() => navigate("/profile/edit")}>
            Edit Profile
          </button>

          <button onClick={() => navigate("/profile/address")}>
            Manage Address
          </button>

          <button onClick={() => navigate("/profile/security")}>
            Security Settings
          </button>

          <button onClick={() => navigate("/profile/notifications")}>
            Notifications
          </button>

          <button onClick={() => navigate("/profile/preferences")}>
            Preferences
          </button>

        </div>

        {/* STATS */}
        <div className="bg-white p-4 rounded-xl shadow grid grid-cols-2 gap-3">

          <div className="p-3 bg-gray-100 rounded">
            Bookings: 12
          </div>

          <div className="p-3 bg-gray-100 rounded">
            Completed: 8
          </div>

          <div className="p-3 bg-gray-100 rounded">
            Rating: 4.7 ⭐
          </div>

          <div className="p-3 bg-gray-100 rounded">
            Wallet: UGX 50,000
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileDashboard;