import React from "react";
import { useNotification } from "../context/NotificationContext";
import NotificationItem from "./NotificationItem";

const NotificationPanel = () => {
  const { notifications } = useNotification();

  return (
    <div style={{ position: "absolute", right: 10, top: 50, width: 300, background: "#fff", padding: 10 }}>
      <h3>Notifications</h3>

      {notifications.length === 0 && <p>No notifications</p>}

      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </div>
  );
};

export default NotificationPanel;