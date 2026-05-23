// src/pages/account/InboxPage.js
import React, { useState } from "react";
import "./InboxPage.css";

function InboxPage() {
  const [search, setSearch] = useState("");

  // Sample messages
  const messages = [
    { id: 1, sender: "Peter Electric", subject: "Your appointment tomorrow", preview: "Reminder: Your electrician appointment is scheduled for 10:00 AM.", time: "2h ago", unread: true },
    { id: 2, sender: "HomiCare Admin", subject: "New feature released", preview: "Check out the new loyalty rewards feature in your app.", time: "1d ago", unread: false },
    { id: 3, sender: "Lucy Cleaning", subject: "Bookings confirmation", preview: "Your cleaning service has been confirmed for tomorrow.", time: "3d ago", unread: true },
    { id: 4, sender: "Alice Cooking", subject: "Meal prep updates", preview: "Your weekly meal prep plan is ready.", time: "5d ago", unread: false },
  ];

  // Filter messages based on search
  const filteredMessages = messages.filter(
    (msg) =>
      msg.sender.toLowerCase().includes(search.toLowerCase()) ||
      msg.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inbox-page">
      <h1>Inbox</h1>

      <div className="inbox-actions">
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="message-list">
        {filteredMessages.map((msg) => (
          <div key={msg.id} className="message-card">
            <div className="message-info">
              <h3>{msg.sender}</h3>
              <p><strong>{msg.subject}</strong> — {msg.preview}</p>
            </div>
            <div className="message-meta">
              <span>{msg.time}</span>
              {msg.unread && <span className="unread-badge">Unread</span>}
            </div>
          </div>
        ))}
        {filteredMessages.length === 0 && <p>No messages found.</p>}
      </div>
    </div>
  );
}

export default InboxPage;