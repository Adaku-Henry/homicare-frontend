import React, { useState } from "react";
import "./Messages.css";

function Messages() {

  const [messages, setMessages] = useState([
    { from: "provider", text: "Hello! How can I help you today?" },
    { from: "user", text: "I want to confirm my booking for tomorrow." }
  ]);

  const [newMsg, setNewMsg] = useState("");

  const sendMessage = () => {
    if (newMsg.trim() === "") return;
    setMessages([...messages, { from: "user", text: newMsg }]);
    setNewMsg("");
  };

  return (
    <div className="messages-container">
      <h2>Messages</h2>
      <div className="messages-box">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.from}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Messages;