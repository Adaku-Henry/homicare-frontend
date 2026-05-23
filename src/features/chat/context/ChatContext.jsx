import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
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
  const [messages, setMessages] = useState(initialMessages);
  const [activeChat, setActiveChat] = useState(null);
  const [typingUsers, setTypingUsers] = useState({});
  const [contacts, setContacts] = useState([]);
  const [recentChats, setRecentChats] = useState([]);

  // ================= OPEN CHAT =================
  const selectChat = useCallback((id) => {
    setActiveChat(id);

    // mark seen
    setMessages((prev) => ({
      ...prev,
      [id]: (prev[id] || []).map((m) => ({
        ...m,
        status: "seen",
      })),
    }));

    // update recent chats
    setRecentChats((prev) => {
      const filtered = prev.filter((c) => c !== id);
      return [id, ...filtered];
    });
  }, []);

  // ================= CHAT CREATION =================
  const createNewChat = useCallback(
    (user) => {
      if (!user) return;

      const exists = users.some((u) => u.id === user.id);

      if (!exists) {
        setUsers((prev) => [
          ...prev,
          {
            ...user,
            online: true,
            lastSeen: new Date().toLocaleTimeString(),
          },
        ]);
      }

      setContacts((prev) => {
        const existsContact = prev.some((c) => c.id === user.id);
        return existsContact ? prev : [...prev, user];
      });

      selectChat(user.id);
    },
    [users, selectChat]
  );

  const startConversation = createNewChat;

  // ================= SEND MESSAGE =================
  const sendMessage = useCallback(
    (text) => {
      if (!activeChat || !text.trim()) return;

      const msg = {
        id: Date.now(),
        chatId: activeChat,
        sender: "me",
        text,
        time: new Date().toLocaleTimeString(),
        status: "sent",
      };

      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), msg],
      }));

      setRecentChats((prev) => {
        const filtered = prev.filter((c) => c !== activeChat);
        return [activeChat, ...filtered];
      });

      // AUTO REPLY (demo)
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
      }, 1000);
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

  // ================= HELPERS (STABLE) =================
  const getLastMessage = useCallback(
    (chatId) => {
      const msgs = messages[chatId] || [];
      return msgs[msgs.length - 1];
    },
    [messages]
  );

  const getUnreadCount = useCallback(
    (chatId) => {
      const msgs = messages[chatId] || [];
      return msgs.filter(
        (m) => m.sender === "other" && m.status !== "seen"
      ).length;
    },
    [messages]
  );

  // ================= CONTEXT VALUE (OPTIMIZED) =================
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

      contacts,
      recentChats,

      typingUsers,
      setTypingUsers,

      getLastMessage,
      getUnreadCount,
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

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);