const AddressCard = ({ address, onDelete }) => {
  return (
    <div className="bg-white p-3 rounded shadow flex justify-between">
      <div>
        <p>{address.city}</p>
        <p className="text-sm text-gray-500">{address.details}</p>
      </div>

      <button
        onClick={() => onDelete(address.id)}
        className="text-red-500"
      >
        Delete
      </button>
    </div>
  );
};

export default AddressCard;