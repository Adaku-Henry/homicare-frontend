import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext";

const NotificationItem = ({ notification }) => {
  const { markAsRead, pushNotification } = useNotification();
  const [reply, setReply] = useState("");

  const handleReply = () => {
    pushNotification(`You replied: ${reply}`, "message");
    setReply("");
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
      <p>{notification.message}</p>

      {!notification.read && (
        <button onClick={() => markAsRead(notification.id)}>
          Mark as Read
        </button>
      )}

      {/* Reply Section */}
      <div>
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Reply..."
        />
        <button onClick={handleReply}>Send</button>
      </div>
    </div>
  );
};

export default NotificationItem;