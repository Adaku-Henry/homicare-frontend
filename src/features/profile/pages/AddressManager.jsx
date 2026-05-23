import { useState } from "react";
import { useAddress } from "../hooks/useAddress";
import AddressCard from "../components/AddressCard";

const AddressManager = () => {
  const { addresses, add, remove } = useAddress();
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");

  const handleAdd = () => {
    add({ city, details });
    setCity("");
    setDetails("");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">

      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <h2 className="text-xl font-bold mb-3">Add Address</h2>

        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="w-full p-2 border mb-2"
        />

        <input
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Details"
          className="w-full p-2 border mb-2"
        />

        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Address
        </button>
      </div>

      <div className="space-y-2">
        {addresses.map((a) => (
          <AddressCard key={a.id} address={a} onDelete={remove} />
        ))}
      </div>

    </div>
  );
};

export default AddressManager;