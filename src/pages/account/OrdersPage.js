// src/pages/account/OrdersPage.js
import React from "react";
import "./OrderPage.css";

const sampleOrders = [
  {
    id: 1,
    service: "Home Cleaning",
    provider: "John Cleaning",
    rating: 4.8,
    price: 50,
    date: "2026-03-16",
    status: "Completed",
  },
  {
    id: 2,
    service: "Plumbing",
    provider: "Sam Plumbing",
    rating: 4.6,
    price: 70,
    date: "2026-03-17",
    status: "Pending",
  },
  {
    id: 3,
    service: "Electrical Repair",
    provider: "Peter Electric",
    rating: 4.7,
    price: 60,
    date: "2026-03-18",
    status: "In Progress",
  },
];

function OrdersPage() {
  const handleViewDetails = (order) => {
    alert(`Viewing details for ${order.service} with ${order.provider}`);
  };

  const handleCancelOrder = (order) => {
    if (order.status === "Pending" || order.status === "In Progress") {
      alert(`Order ${order.id} canceled successfully!`);
    } else {
      alert("Completed orders cannot be canceled.");
    }
  };

  const handleRateProvider = (order) => {
    alert(`Rate ${order.provider} for ${order.service}`);
  };

  return (
    <div className="account-page">
      <h1>My Orders</h1>
      <div className="orders-list">
        {sampleOrders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>{order.service}</h3>
            <p>Provider: {order.provider}</p>
            <p>Price: ${order.price}</p>
            <p>Date: {order.date}</p>
            <p>
              Status:{" "}
              <span className={`status ${order.status.replace(" ", "-").toLowerCase()}`}>
                {order.status}
              </span>
            </p>
            <p>Rating: {order.rating} ⭐</p>
            <div className="order-actions">
              <button onClick={() => handleViewDetails(order)}>View Details</button>
              {(order.status === "Pending" || order.status === "In Progress") && (
                <button onClick={() => handleCancelOrder(order)}>Cancel</button>
              )}
              {order.status === "Completed" && (
                <button onClick={() => handleRateProvider(order)}>Rate Provider</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;