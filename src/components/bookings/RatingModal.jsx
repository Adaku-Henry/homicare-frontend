import { useState } from "react";

const RatingModal = ({ bookingId, onClose }) => {
  const [rating, setRating] = useState(0);

  const submitRating = () => {
    console.log("Rated booking:", bookingId, rating);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

      <div className="bg-white p-5 rounded-xl">
        <h3 className="text-lg font-bold mb-3">Rate Service</h3>

        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-2xl cursor-pointer ${
                rating >= star ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <button
          onClick={submitRating}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

    </div>
  );
};

export default RatingModal;