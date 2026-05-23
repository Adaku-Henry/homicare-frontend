import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

function InputBar() {
  const { sendMessage, activeChat, startTyping, stopTyping } =
    useChat();

  const [text, setText] = useState("");

  const send = () => {
    if (!text) return;

    sendMessage({
      id: Date.now(),
      text,
      chatId: activeChat,
      sender: "me",
      time: new Date().toLocaleTimeString(),
    });

    setText("");
  };

  const typing = (val) => {
    setText(val);
    startTyping(activeChat);

    setTimeout(() => {
      stopTyping(activeChat);
    }, 500);
  };

  return (
    <div className="inputBar">
      <input
        value={text}
        onChange={(e) =>
          typing(e.target.value)
        }
        placeholder="Message..."
      />

      <button onClick={send}>
        ➤
      </button>
    </div>
  );
}

export default InputBar;