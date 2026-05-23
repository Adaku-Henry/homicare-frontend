import React, { useState, useRef } from "react";
import { useChat } from "../context/ChatContext";

function ChatInput() {
  const { sendMessage, sendFile } = useChat();

  const [text, setText] = useState("");
  const fileRef = useRef();

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    sendFile(file);
  };

  return (
    <div style={styles.container}>

      {/* FILE BUTTON */}
      <button onClick={() => fileRef.current.click()} style={styles.attach}>
        📎
      </button>

      <input
        type="file"
        ref={fileRef}
        style={{ display: "none" }}
        onChange={handleFile}
      />

      {/* TEXT INPUT */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        style={styles.input}
      />

      {/* SEND */}
      <button onClick={handleSend} style={styles.send}>
        <button style={styles.mic}>🎤</button>
        ➤
      </button>
    </div>
  );
}

export default ChatInput;

const styles = {
  container: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #eee",
    background: "#fff",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
  },
  send: {
    marginLeft: "10px",
    padding: "10px",
    background: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
  },
  attach: {
    marginRight: "10px",
    fontSize: "18px",
  },
  mic: {
  marginLeft: "10px",
  fontSize: "18px",
}
};