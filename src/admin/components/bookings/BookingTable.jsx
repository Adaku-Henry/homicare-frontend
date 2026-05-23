import React from "react";

export default function BookingTable({ data, onSelect }) {
  return (
    <table width="100%" border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Client</th>
          <th>Provider</th>
          <th>Service</th>
          <th>Status</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((b) => (
          <tr key={b.id}>
            <td>{b.client}</td>
            <td>{b.provider}</td>
            <td>{b.service}</td>
            <td>{b.status}</td>
            <td>{b.date}</td>
            <td>{b.amount}</td>
            <td>
              <button onClick={() => onSelect(b)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}