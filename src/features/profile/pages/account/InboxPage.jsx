import React, { useState } from "react";

function InboxPage() {

  const [conversations] = useState([
    {
      id: 1,
      name: "John Cleaner",
      messages: [
        { from: "John Cleaner", text: "Hello! Are you still interested?" },
        { from: "You", text: "Yes, I am." }
      ]
    },
    {
      id: 2,
      name: "Electric Pro",
      messages: [
        { from: "Electric Pro", text: "I can come tomorrow." }
      ]
    }
  ]);

  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  // ================= SEND MESSAGE =================
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedChat = {
      ...activeChat,
      messages: [
        ...activeChat.messages,
        { from: "You", text: newMessage }
      ]
    };

    setActiveChat(updatedChat);
    setNewMessage("");
  };

  return (
    <div style={container}>

      {/* ================= LEFT SIDEBAR ================= */}
      <div style={sidebar}>
        <h3>Inbox</h3>

        {conversations.map(chat => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            style={{
              padding: 10,
              cursor: "pointer",
              background: activeChat.id === chat.id ? "#e5e7eb" : "white",
              borderBottom: "1px solid #ddd"
            }}
          >
            {chat.name}
          </div>
        ))}
      </div>

      {/* ================= CHAT BOX ================= */}
      <div style={chatBox}>

        <h3>{activeChat.name}</h3>

        {/* MESSAGES */}
        <div style={messagesBox}>
          {activeChat.messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.from === "You" ? "right" : "left",
                marginBottom: 10
              }}
            >
              <span style={bubble(msg.from === "You")}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div style={inputBox}>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type message..."
            style={input}
          />

          <button onClick={sendMessage} style={btn}>
            Send
          </button>
        </div>

      </div>

    </div>
  );
}

// ================= STYLES =================
const container = {
  display: "flex",
  height: "80vh",
  border: "1px solid #ddd",
  borderRadius: 10,
  overflow: "hidden"
};

const sidebar = {
  width: "30%",
  borderRight: "1px solid #ddd",
  overflowY: "auto"
};

const chatBox = {
  flex: 1,
  display: "flex",
  flexDirection: "column"
};

const messagesBox = {
  flex: 1,
  padding: 10,
  overflowY: "auto",
  background: "#f9fafb"
};

const inputBox = {
  display: "flex",
  padding: 10,
  borderTop: "1px solid #ddd"
};

const input = {
  flex: 1,
  padding: 10
};

const btn = {
  padding: "10px 15px",
  background: "#111827",
  color: "white",
  border: "none"
};

const bubble = (isMe) => ({
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: 10,
  background: isMe ? "#111827" : "#e5e7eb",
  color: isMe ? "white" : "black"
});

export default InboxPage;