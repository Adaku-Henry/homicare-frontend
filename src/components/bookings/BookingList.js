import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "./BookingCard";

function BookingList() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/api/bookings")
      .then(res => setBookings(res.data));

  }, []);

  return (

    <div>

      <h2>My Bookings</h2>

      {bookings.map(booking => (

        <BookingCard
          key={booking._id}
          booking={booking}
        />

      ))}

    </div>

  );
}

export default BookingList;