import React from "react";

function LiveProviders({ providers }) {
  return (
    <div className="bg-white p-3 shadow rounded">

      <h3 className="font-bold mb-2">Live Providers</h3>

      {providers.slice(0, 5).map(p => (
        <div key={p.id} className="border-b py-1">
          🧑‍🔧 {p.fullName}
        </div>
      ))}

    </div>
  );
}

export default LiveProviders;