import React from "react";

function LiveUsers({ users }) {
  return (
    <div className="bg-white p-3 shadow rounded">

      <h3 className="font-bold mb-2">Live Users</h3>

      {users.slice(0, 5).map(u => (
        <div key={u.id} className="border-b py-1">
          👤 {u.fullName}
        </div>
      ))}

    </div>
  );
}

export default LiveUsers;