import React from "react";
import { useNotification } from "../ context/NotificationContext";

const NotificationBell = ({ onClick }) => {
  const { notifications } = useNotification();

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      🔔
      {unread > 0 && (
        <span style={{ color: "red", marginLeft: 5 }}>
          ({unread})
        </span>
      )}
    </div>
  );
};

export default NotificationBell;