const sendMessage = (text) => {
  if (!activeChat || !text.trim()) return;

  const newMsg = {
    id: Date.now(),
    sender: "me",
    text,
    time: new Date().toLocaleTimeString(),
  };

  setMessages((prev) => ({
    ...prev,
    [activeChat]: [...(prev[activeChat] || []), newMsg],
  }));

  socket.send(
  JSON.stringify({
    message: text,
  })
);

  // reset unread count for current chat
  setUnread((prev) => ({
    ...prev,
    [activeChat]: 0,
  }));
};