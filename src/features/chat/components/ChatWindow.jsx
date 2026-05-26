import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { useChat } from "../context/ChatContext";
import { getSocket } from "../socket/socket";
import "./ChatWindow.css";

const socket = getSocket();

function ChatWindow() {
  const {
    activeChat,
    messages,
    users,
    setMessages,
    selectChat,
  } = useChat();

  const [text, setText] = useState("");
  const [typingUsers, setTypingUsers] = useState({});
  const [contactsOpen, setContactsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [onlineUsers, setOnlineUsers] = useState({});
  const [pendingQueue, setPendingQueue] = useState([]);

  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const endRef = useRef(null);
  const typingRef = useRef(null);

  // ================= SAFE SOCKET =================
  const safeEmit = useCallback((event, data) => {
    if (socket?.readyState === 1) {
      socket.send(JSON.stringify({ event, data }));
    }
  }, []);

  // ================= CHAT MESSAGES =================
  const chatMessages = useMemo(
    () => messages?.[activeChat] || [],
    [messages, activeChat]
  );

  const activeUser = useMemo(
    () => users?.find((u) => u.id === activeChat),
    [users, activeChat]
  );

  // ================= SOCKET HANDLER =================
  useEffect(() => {
    if (!activeChat) return;

    safeEmit("join_chat", { chatId: activeChat });

    const handleSocketMessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.event === "receive_message") {
          const msg = payload.data;

          setMessages((prev) => ({
            ...prev,
            [msg.chatId]: [...(prev[msg.chatId] || []), msg],
          }));
        }

        if (payload.event === "typing") {
          setTypingUsers((prev) => ({
            ...prev,
            [payload.data.userId]: true,
          }));
        }

        if (payload.event === "stop_typing") {
          setTypingUsers((prev) => ({
            ...prev,
            [payload.data.userId]: false,
          }));
        }

        if (payload.event === "online_users") {
          setOnlineUsers(payload.data || {});
        }
      } catch (e) {
        console.log("socket error", e);
      }
    };

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [activeChat, safeEmit, setMessages]);

  // ================= AUTO SCROLL (mobile safe) =================
  useEffect(() => {
    const timeout = setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    return () => clearTimeout(timeout);
  }, [chatMessages]);

  // ================= SEND MESSAGE =================
  const send = () => {
    if (!text.trim() || !activeChat) return;

    const msg = {
      id: Date.now(),
      chatId: activeChat,
      text,
      sender: "me",
      time: new Date().toLocaleTimeString(),
      status: "sent",
    };

    // optimistic UI
    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), msg],
    }));

    // send socket
    safeEmit("send_message", msg);

    // offline queue fallback
    setPendingQueue((prev) => [...prev, msg]);

    setText("");
  };

  // ================= TYPING (debounced) =================
  const handleTyping = (val) => {
    setText(val);

    safeEmit("typing", { chatId: activeChat });

    clearTimeout(typingRef.current);

    typingRef.current = setTimeout(() => {
      safeEmit("stop_typing", { chatId: activeChat });
    }, 600);
  };

  // ================= CONTACTS =================
  const addContact = () => {
    if (!form.name || !form.phone) return;

    const id = Date.now();

    const newContact = {
      id,
      name: form.name,
      phone: form.phone,
      email: form.email,
    };

    setContacts((prev) => [...prev, newContact]);

    setMessages((prev) => ({
      ...prev,
      [id]: prev[id] || [],
    }));

    selectChat(id);
    setForm({ name: "", phone: "", email: "" });
    setContactsOpen(false);
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ================= EMPTY STATE =================
  if (!activeChat) {
    return (
      <div className="emptyChat">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="chatWrapper">

      {/* HEADER */}
      <div className="chatHeader">
        <div>
          <div className="chatUser">
            {activeUser?.name || "Chat"}
          </div>

          <small className="status">
            {onlineUsers[activeChat] ? "🟢 online" : "⚫ offline"}
          </small>
        </div>

        <button
          className="menuBtn"
          onClick={() => setContactsOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* CHAT BODY */}
      <div className="chatBody">
        {chatMessages.map((msg, i) => (
          <div
            key={msg.id}
            className={`msg ${msg.sender === "me" ? "me" : "other"}`}
          >
            <div className="msgText">{msg.text}</div>

            <div className="msgMeta">
              {msg.time}
              {msg.sender === "me" && " ✔✔"}
            </div>
          </div>
        ))}

        <div ref={endRef} />
      </div>

      {/* TYPING INDICATOR */}
      {Object.values(typingUsers).some(Boolean) && (
        <div className="typing">Someone is typing...</div>
      )}

      {/* INPUT */}
      <div className="chatInputBar">
        <input
          value={text}
          onChange={(e) => handleTyping(e.target.value)}
          placeholder="Type a message..."
          className="chatInput"
        />

        <button className="sendBtn" onClick={send}>
          ➤
        </button>
      </div>

      {/* CONTACT DRAWER */}
      <div className={`drawer ${contactsOpen ? "open" : ""}`}>

        <div className="drawerHeader">
          <h3>Contacts</h3>
          <button onClick={() => setContactsOpen(false)}>✕</button>
        </div>

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <button onClick={addContact}>+ Add Contact</button>

        <div className="contactList">
          {filteredContacts.map((c) => (
            <div
              key={c.id}
              className="contactCard"
              onClick={() => selectChat(c.id)}
            >
              <div>
                <b>{c.name}</b>
                <small>{c.phone}</small>
              </div>

              <span
                className={
                  onlineUsers[c.id] ? "onlineDot" : "offlineDot"
                }
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default ChatWindow;