import React, { useState } from "react";
import { BookingsData } from "../components/bookings/BookingsData";
import BookingFilters from "../components/bookings/BookingFilters";
import BookingTable from "../components/bookings/BookingTable";
import BookingDetails from "../components/bookings/BookinDetails";

export default function Bookings() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredData =
    filter === "All"
      ? BookingsData
      : BookingsData.filter(b => b.status === filter);

  return (
    <div>

      <h2>Bookings Management</h2>

      {/* FILTERS */}
      <BookingFilters setFilter={setFilter} />

      {/* TABLE */}
      <BookingTable
        data={filteredData}
        onSelect={(b) => setSelected(b)}
      />

      {/* DETAILS PANEL */}
      {selected && (
        <BookingDetails
          booking={selected}
          onClose={() => setSelected(null)}
        />
      )}

    </div>
  );
}