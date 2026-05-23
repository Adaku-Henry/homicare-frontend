import React, { useState } from "react";

function NotificationsPage() {

  const [notifications] = useState([
    {
      id: 1,
      type: "like",
      message: "John liked your post",
      time: "2 min ago"
    },
    {
      id: 2,
      type: "comment",
      message: "Sarah commented on your post",
      time: "10 min ago"
    },
    {
      id: 3,
      type: "follow",
      message: "Electric Pro started following you",
      time: "1 hour ago"
    },
    {
      id: 4,
      type: "message",
      message: "You received a new message from John Cleaner",
      time: "Today"
    }
  ]);

  const getIcon = (type) => {
    switch (type) {
      case "like": return "👍";
      case "comment": return "💬";
      case "follow": return "👤";
      case "message": return "📩";
      default: return "🔔";
    }
  };

  return (
    <div style={container}>

      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        notifications.map(n => (
          <div key={n.id} style={card}>

            <div style={{ fontSize: 20 }}>
              {getIcon(n.type)}
            </div>

            <div style={{ flex: 1, marginLeft: 10 }}>
              <p style={{ margin: 0 }}>{n.message}</p>
              <small style={{ color: "gray" }}>{n.time}</small>
            </div>

          </div>
        ))
      )}

    </div>
  );
}

// ================= STYLES =================
const container = {
  maxWidth: 700,
  margin: "auto",
  padding: 20
};

const card = {
  display: "flex",
  alignItems: "center",
  padding: 15,
  marginTop: 10,
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

export default NotificationsPage;