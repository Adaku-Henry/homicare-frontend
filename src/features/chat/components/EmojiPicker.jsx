import React from "react";
import EmojiPicker from "emoji-picker-react";
import { useChat } from "../context/ChatContext";

function EmojiSelector({ setText }) {
  const onEmojiClick = (emoji) => {
    setText((prev) => prev + emoji.emoji);
  };

  return <EmojiPicker onEmojiClick={onEmojiClick} />;
}

export default EmojiSelector;