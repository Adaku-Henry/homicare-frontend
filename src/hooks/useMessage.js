import { useState } from "react";
import { getMessages, sendMessage } from "../api/communications";

export default function useMessages() {
  const [messages, setMessages] = useState([]);

  const loadMessages = async (bookingId) => {
    try {
      const res = await getMessages(bookingId);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const send = async (data) => {
    try {
      await sendMessage(data);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    messages,
    loadMessages,
    send,
  };
}