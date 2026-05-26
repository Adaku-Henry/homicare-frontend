const sendMessage = useCallback(
  (text) => {
    const cleanText = text?.trim();

    // ✅ Validation (prevents empty + crash cases)
    if (!activeChat || !cleanText) return;
    if (!socket) {
      console.warn("Socket not initialized");
      return;
    }

    const messageId = Date.now();

    const newMsg = {
      id: messageId,
      sender: "me",
      text: cleanText,
      chatId: activeChat,
      status: "sending", // future-proof (sent/delivered/read)
      time: new Date().toLocaleTimeString(),
    };

    // ===============================
    // 1. Optimistic UI update
    // ===============================
    setMessages((prev) => {
      const chatMessages = prev?.[activeChat] || [];

      return {
        ...prev,
        [activeChat]: [...chatMessages, newMsg],
      };
    });

    // ===============================
    // 2. Safe socket communication
    // ===============================
    try {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "message",
            id: messageId,
            chatId: activeChat,
            message: cleanText,
            timestamp: Date.now(),
          })
        );
      } else {
        console.warn("Socket not open. Message queued locally.");
      }
    } catch (err) {
      console.error("Socket send error:", err);
    }

    // ===============================
    // 3. Reset unread count safely
    // ===============================
    setUnread((prev) => ({
      ...prev,
      [activeChat]: 0,
    }));
  },
  [activeChat, socket, setMessages, setUnread]
);