import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useCommunications from "../../hooks/useCommunications";
import "./ChatPage.css";

function ChatPage() {
  const { bookingId } = useParams(); // only declare once
  const { messages, send, loading } = useCommunications(bookingId);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    send(text);
    setText("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Conversation</h3>
      </div>

      <div className="chat-box">
        {loading && <p>Loading...</p>}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.is_sender ? "sent" : "received"}`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;