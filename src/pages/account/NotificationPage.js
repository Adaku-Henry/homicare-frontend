// src/pages/account/NotificationsPage.css
import React, { useState } from "react";
import "./NotificationsPage.css";

function NotificationsPage() {
  // Sample notifications data
  const initialNotifications = [
    { id: 1, type: "Order", title: "New Order Received", description: "Order #1023 has been placed", time: "2 mins ago", read: false },
    { id: 2, type: "Rating", title: "New Review", description: "You received a 5-star review from John D.", time: "1 hour ago", read: false },
    { id: 3, type: "Message", title: "New Message", description: "Lucy sent you a message.", time: "3 hours ago", read: true },
    { id: 4, type: "Promotion", title: "Special Offer", description: "Get 20% off this week on services", time: "1 day ago", read: false },
    { id: 5, type: "System", title: "System Update", description: "Maintenance scheduled for tomorrow 2:00 AM", time: "2 days ago", read: true },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("All");

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications =
    filter === "All" ? notifications : notifications.filter(n => n.type === filter);

  return (
    <div className="notifications-page">
      <h1>Notifications</h1>

      <div className="notifications-controls">
        <div className="filter-group">
          <label>Filter: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Order">Orders</option>
            <option value="Rating">Ratings</option>
            <option value="Message">Messages</option>
            <option value="Promotion">Promotions</option>
            <option value="System">System</option>
          </select>
        </div>
        <button className="mark-all-btn" onClick={markAllAsRead}>
          Mark All as Read
        </button>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <p className="no-notifications">No notifications to show.</p>
        ) : (
          filteredNotifications.map((n) => (
            <div key={n.id} className={`notification-card ${n.read ? "read" : "unread"}`}>
              <div className="notification-content">
                <h3>{n.title}</h3>
                <p>{n.description}</p>
                <span className="notification-time">{n.time}</span>
              </div>
              <div className="notification-actions">
                {!n.read && (
                  <button onClick={() => markAsRead(n.id)} className="read-btn">
                    Mark as Read
                  </button>
                )}
                <button onClick={() => deleteNotification(n.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;