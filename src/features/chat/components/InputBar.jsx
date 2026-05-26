import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../context/ChatContext";

function InputBar() {
  const { sendMessage, activeChat, startTyping, stopTyping } = useChat();

  const [text, setText] = useState("");
  const typingTimeout = useRef(null);

  const handleTyping = (val) => {
    setText(val);

    startTyping(activeChat);

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      stopTyping(activeChat);
    }, 800);
  };

  const send = () => {
    if (!text.trim()) return;

    sendMessage({ text });

    setText("");
    stopTyping(activeChat);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") send();
  };

  return (
    <div className="inputBar">
      <input
        value={text}
        onChange={(e) => handleTyping(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message..."
      />

      <button onClick={send}>➤</button>
    </div>
  );
}

export default InputBar;