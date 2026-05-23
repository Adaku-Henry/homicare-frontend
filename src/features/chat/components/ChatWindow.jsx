import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
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
  const [typingUser, setTypingUser] = useState("");
  const [contactsOpen, setContactsOpen] = useState(false);
  const [contacts, setContacts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const endRef = useRef();

  // ================= SAFE SOCKET =================
  const safeEmit = (event, data) => {
    if (socket && typeof socket.emit === "function") {
      socket.emit(event, data);
    }
  };

  // ================= CHAT MESSAGES =================
  const chatMessages = useMemo(() => {
    return messages?.[activeChat] || [];
  }, [messages, activeChat]);

  const activeUser = useMemo(() => {
    return users?.find((u) => u.id === activeChat);
  }, [users, activeChat]);

  // ================= SOCKET LISTENERS =================
  useEffect(() => {
    if (!activeChat || !socket) return;

    safeEmit("join_chat", activeChat);

    const handleMessage = (msg) => {
      if (!msg?.chatId) return;

      setMessages((prev) => ({
        ...prev,
        [msg.chatId]: [...(prev[msg.chatId] || []), msg],
      }));
    };

    const handleTyping = (chatId) => {
      if (chatId === activeChat) setTypingUser("Typing...");
    };

    const handleStopTyping = () => setTypingUser("");

    socket.on?.("receive_message", handleMessage);
    socket.on?.("typing", handleTyping);
    socket.on?.("stop_typing", handleStopTyping);

    return () => {
      socket.off?.("receive_message", handleMessage);
      socket.off?.("typing", handleTyping);
      socket.off?.("stop_typing", handleStopTyping);
    };
  }, [activeChat, setMessages]);

  // ================= AUTO SCROLL =================
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
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

    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), msg],
    }));

    safeEmit("send_message", msg);

    // fake reply (dev mode)
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        chatId: activeChat,
        text: "Got your message 👍",
        sender: "other",
        time: new Date().toLocaleTimeString(),
        status: "seen",
      };

      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), reply],
      }));
    }, 1000);

    setText("");
  };

  // ================= TYPING =================
  const handleTyping = (val) => {
    setText(val);

    safeEmit("typing", activeChat);

    clearTimeout(window.typingTimer);

    window.typingTimer = setTimeout(() => {
      safeEmit("stop_typing", activeChat);
    }, 500);
  };

  // ================= ADD CONTACT (FIXED & SAFE) =================
  const addContact = () => {
    if (!form.name.trim() || !form.phone.trim()) return;

    const newId = Date.now();

    const newContact = {
      id: newId,
      name: form.name,
      phone: form.phone,
      email: form.email,
      online: true,
    };

    // save locally
    setContacts((prev) => [...prev, newContact]);

    // create chat history if missing
    setMessages((prev) => {
      return ({
        ...prev,
        [newId]: prev[newId] || [],
      });
    });

    // add to users safely (NO PUSH mutation)
    const exists = users?.find((u) => u.id === newId);

    if (!exists) {
// NOTE: if your context does not support setUsers,
      // we just rely on selectChat + messages mapping
    }

    // open chat immediately
    selectChat(newId);

    setForm({ name: "", phone: "", email: "" });
    setContactsOpen(false);
  };

  // ================= OPEN CHAT =================
  const openChat = (contact) => {
    selectChat(contact.id);
  };

  const openWA = (phone) =>
    window.open(`https://wa.me/${phone}`);

  const openSMS = (phone) =>
    window.open(`sms:${phone}`);

  const openEmail = (email) =>
    window.open(`mailto:${email}`);

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
        <div className="chatUser">
          {activeUser?.name || "Chat"}
        </div>

        <div className="typing">{typingUser}</div>

        <button
          className="addBtn"
          onClick={() => setContactsOpen(true)}
        >
          +
        </button>
      </div>

      {/* MESSAGES */}
      <div className="chatBody">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`msg ${msg.sender === "me" ? "me" : "other"}`}
          >
            <div className="msgText">{msg.text}</div>
            <div className="msgTime">
              {msg.time} {msg.sender === "me" && "✔✔"}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

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

        <h3>Contacts</h3>

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

        <button onClick={addContact}>
          Save Contact
        </button>

        <button onClick={() => setContactsOpen(false)}>
          Close
        </button>

        {/* CONTACT LIST */}
        <div className="contactList">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="contactCard"
              onClick={() => openChat(c)}
            >
              <b>{c.name}</b>

              <div className="contactActions">
                <button onClick={() => openWA(c.phone)}>WA</button>
                <button onClick={() => openSMS(c.phone)}>SMS</button>
                <button onClick={() => openEmail(c.email)}>Email</button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default ChatWindow;