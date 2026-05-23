import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

function MessageInput() {
  const {
    sendMessage,
    activeChat,
    startTyping,
    stopTyping,
  } = useChat();

  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(text);
    setText("");
    stopTyping(activeChat);
  };

  return (
    <div style={styles.container}>
      <input
        value={text}
        placeholder="Type a message..."
        style={styles.input}
        onChange={(e) => {
          setText(e.target.value);

          startTyping(activeChat);

          setTimeout(() => {
            stopTyping(activeChat);
          }, 800);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button style={styles.button} onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

export default MessageInput;

const styles = {
  container: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ddd",
    background: "#fff",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
  },
  button: {
    marginLeft: "10px",
    padding: "10px 15px",
    borderRadius: "20px",
    background: "#4a90e2",
    color: "#fff",
    border: "none",
  },
};