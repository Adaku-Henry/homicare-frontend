// src/hooks/useCommunications.js
import { useState, useEffect, useRef, useCallback } from "react";
import { getMessages, sendMessage } from "../services/api";

export default function useCommunications(bookingId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const intervalRef = useRef(null);

  // useCallback ensures the function reference is stable for useEffect dependencies
  const loadMessages = useCallback(async () => {
    if (!bookingId) return;

    setLoading(true);
    try {
      const res = await getMessages(bookingId);

      const currentUser = JSON.parse(localStorage.getItem("homicare_user"));

      const processed = res.data.map((msg) => ({
        ...msg,
        is_sender: msg.sender === currentUser?.id,
      }));

      setMessages(processed);
      setError(null);
    } catch (err) {
      setError("Failed to load messages");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  const send = async (content) => {
    if (!bookingId || !content) return;
    try {
      const newMsg = { booking: bookingId, content };
      await sendMessage(newMsg);
      loadMessages();
    } catch (err) {
      console.error("Send failed", err);
    }
  };

  const startAutoRefresh = useCallback(() => {
    if (intervalRef.current) return; // prevent multiple intervals
    intervalRef.current = setInterval(() => {
      loadMessages();
    }, 3000);
  }, [loadMessages]);

  const stopAutoRefresh = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    loadMessages();
    startAutoRefresh();

    return () => stopAutoRefresh();
  }, [bookingId, loadMessages, startAutoRefresh]);

  return { messages, loading, error, send, loadMessages };
}