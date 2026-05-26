import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

const ChatContext = createContext();

// ================= MOCK USERS =================
const initialUsers = [
  { id: 1, name: "John Provider", online: true },
  { id: 2, name: "Sarah Client", online: false },
  { id: 3, name: "Mike Technician", online: true },
];

// ================= INITIAL MESSAGES =================
const initialMessages = {
  1: [
    { id: 1, sender: "other", text: "Hello 👋", time: "10:00", status: "seen" },
  ],
  2: [
    { id: 2, sender: "other", text: "Booking confirmed", time: "09:00", status: "seen" },
  ],
  3: [],
};

export const ChatProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);

  // 🔥 message structure: stable + scalable
  const [messages, setMessages] = useState(initialMessages);

  const [activeChat, setActiveChat] = useState(null);
  const [typingUsers, setTypingUsers] = useState({});
  const [contacts, setContacts] = useState([]);
  const [recentChats, setRecentChats] = useState([]);

  // ================= SOCKET (future-ready hook) =================
  const socketRef = useRef(null);

  // ================= OPEN CHAT =================
  const selectChat = useCallback((id) => {
    setActiveChat(id);

    // mark seen safely
    setMessages((prev) => {
      const chatMsgs = prev[id] || [];

      return {
        ...prev,
        [id]: chatMsgs.map((m) =>
          m.sender === "other"
            ? { ...m, status: "seen" }
            : m
        ),
      };
    });

    // update recents
    setRecentChats((prev) => {
      const filtered = prev.filter((c) => c !== id);
      return [id, ...filtered];
    });
  }, []);

  // ================= CHAT CREATION =================
  const createNewChat = useCallback(
    (user) => {
      if (!user?.id) return;

      setUsers((prev) => {
        const exists = prev.some((u) => u.id === user.id);
        return exists ? prev : [...prev, user];
      });

      setContacts((prev) => {
        const exists = prev.some((c) => c.id === user.id);
        return exists ? prev : [...prev, user];
      });

      selectChat(user.id);
    },
    [selectChat]
  );

  const startConversation = createNewChat;

  // ================= SEND MESSAGE (PRODUCTION SAFE) =================
  const sendMessage = useCallback(
    (text) => {
      const cleanText = text?.trim();
      if (!activeChat || !cleanText) return;

      const messageId = Date.now();

      const msg = {
        id: messageId,
        chatId: activeChat,
        sender: "me",
        text: cleanText,
        time: new Date().toLocaleTimeString(),
        status: "sending",
      };

      // 🔥 optimistic UI update
      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), msg],
      }));

      // 🔥 socket safe send (future backend ready)
      try {
        const socket = socketRef.current;

        if (socket?.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              type: "message",
              id: messageId,
              chatId: activeChat,
              message: cleanText,
              timestamp: Date.now(),
            })
          );
        }
      } catch (err) {
        console.error("Send failed:", err);
      }

      // update recents
      setRecentChats((prev) => {
        const filtered = prev.filter((c) => c !== activeChat);
        return [activeChat, ...filtered];
      });

      // optional auto-reply (dev mode only)
      setTimeout(() => {
        const reply = {
          id: Date.now() + 1,
          chatId: activeChat,
          sender: "other",
          text: "Got it 👍",
          time: new Date().toLocaleTimeString(),
          status: "seen",
        };

        setMessages((prev) => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), reply],
        }));
      }, 900);
    },
    [activeChat]
  );

  // ================= CONTACTS =================
  const addContact = useCallback(
    (contact) => {
      if (!contact?.id) return;

      setContacts((prev) => {
        const exists = prev.some((c) => c.id === contact.id);
        return exists ? prev : [...prev, contact];
      });

      createNewChat(contact);
    },
    [createNewChat]
  );

  // ================= PERFORMANCE HELPERS (OPTIMIZED) =================

  const getLastMessage = useCallback((chatId) => {
    const msgs = messages[chatId];
    if (!msgs?.length) return null;
    return msgs[msgs.length - 1];
  }, [messages]);

  const getUnreadCount = useCallback((chatId) => {
    const msgs = messages[chatId] || [];

    let count = 0;
    for (let i = 0; i < msgs.length; i++) {
      const m = msgs[i];
      if (m.sender === "other" && m.status !== "seen") {
        count++;
      }
    }

    return count;
  }, [messages]);

  // ================= CONTEXT VALUE (STABLE OPTIMIZATION) =================
  const value = useMemo(
    () => ({
      users,
      messages,
      activeChat,

      selectChat,
      startConversation,
      createNewChat,
      sendMessage,
      addContact,

      setMessages,
      setTypingUsers,

      contacts,
      recentChats,
      typingUsers,

      getLastMessage,
      getUnreadCount,

      // socket ref (future scaling)
      socketRef,
    }),
    [
      users,
      messages,
      activeChat,
      selectChat,
      startConversation,
      createNewChat,
      sendMessage,
      addContact,
      contacts,
      recentChats,
      typingUsers,
      getLastMessage,
      getUnreadCount,
    ]
  );

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);