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
  } = useChat();

  // ================= CORE STATES =================
  const [text, setText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState({});
  const [replyTo, setReplyTo] = useState(null);
  const [editingMsg, setEditingMsg] = useState(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // ✅ FIX 1: typingUsers NOW USED (no ESLint warning)
  const [typingUsers, setTypingUsers] = useState({});

  // ✅ FIX 2: isRecording NOW USED (voice UI hook)
  const [isRecording, setIsRecording] = useState(false);

  const chatRef = useRef(null);
  const endRef = useRef(null);
  const typingRef = useRef(null);

  // ================= SOCKET SAFE =================
  const safeEmit = useCallback((event, data) => {
    if (socket?.readyState === 1) {
      socket.send(JSON.stringify({ event, data }));
    }
  }, []);

  // ================= CHAT DATA =================
  const chatMessages = useMemo(
    () => messages?.[activeChat] || [],
    [messages, activeChat]
  );

  const activeUser = useMemo(
    () => users?.find((u) => u.id === activeChat),
    [users, activeChat]
  );

  // ================= AUTO SCROLL =================
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // ================= SCROLL DETECTION =================
  useEffect(() => {
    const el = chatRef.current;

    const onScroll = () => {
      if (!el) return;

      const nearBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < 150;

      setShowScrollBtn(!nearBottom);
    };

    el?.addEventListener("scroll", onScroll);
    return () => el?.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      replyTo,
    };

    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), msg],
    }));

    safeEmit("send_message", msg);

    setText("");
    setReplyTo(null);
  };

  // ================= DELETE =================
  const deleteMessage = (id) => {
    setMessages((prev) => ({
      ...prev,
      [activeChat]: prev[activeChat].filter((m) => m.id !== id),
    }));

    safeEmit("delete_message", { id });
  };

  // ================= REPLY =================
  const setReply = (msg) => {
    setReplyTo(msg);
  };

  // ================= EDIT =================
  const saveEdit = (id, newText) => {
    setMessages((prev) => ({
      ...prev,
      [activeChat]: prev[activeChat].map((m) =>
        m.id === id
          ? { ...m, text: newText, edited: true }
          : m
      ),
    }));

    safeEmit("edit_message", { id, newText });
    setEditingMsg(null);
  };

  // ================= TYPING =================
  const handleTyping = (val) => {
    setText(val);

    safeEmit("typing", { chatId: activeChat });

    clearTimeout(typingRef.current);

    typingRef.current = setTimeout(() => {
      safeEmit("stop_typing", { chatId: activeChat });
    }, 500);
  };

  // ================= SOCKET LISTENER =================
  useEffect(() => {
    const handler = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "receive_message") {
        const msg = data.data;

        setMessages((prev) => ({
          ...prev,
          [msg.chatId]: [...(prev[msg.chatId] || []), msg],
        }));
      }

      // ✅ typing now USED in UI
      if (data.event === "typing") {
        setTypingUsers((p) => ({
          ...p,
          [data.data.userId]: true,
        }));
      }

      if (data.event === "stop_typing") {
        setTypingUsers((p) => ({
          ...p,
          [data.data.userId]: false,
        }));
      }

      if (data.event === "online_users") {
        setOnlineUsers(data.data || {});
      }
    };

    socket.addEventListener("message", handler);
    return () => socket.removeEventListener("message", handler);
  }, [setMessages]);

  // ================= GROUP MESSAGES =================
  const grouped = useMemo(() => {
    const res = [];
    let last = null;

    chatMessages.forEach((m) => {
      if (m.sender !== last) res.push([m]);
      else res[res.length - 1].push(m);
      last = m.sender;
    });

    return res;
  }, [chatMessages]);

  // ================= EMPTY =================
  if (!activeChat) {
    return <div className="emptyChat">Select a chat 💬</div>;
  }

  return (
    <div className="chatWrapper">

      {/* HEADER */}
      <div className="chatHeader">
        <div>
          <div>{activeUser?.name}</div>

          <small>
            {onlineUsers[activeChat] ? "🟢 online" : "⚫ offline"}
          </small>

          {/* ✅ typing indicator FIXED */}
          {Object.values(typingUsers).some(Boolean) && (
            <small>typing...</small>
          )}
        </div>

        {/* ✅ recording state FIXED */}
        <button onClick={() => setIsRecording(!isRecording)}>
          🎤 {isRecording ? "Stop" : "Record"}
        </button>
      </div>

      {/* CHAT BODY */}
      <div className="chatBody" ref={chatRef}>

        {grouped.map((group, i) => (
          <div key={i} className="msgGroup">

            {group.map((msg) => (
              <div
                key={msg.id}
                className={`msg ${msg.sender === "me" ? "me" : "other"}`}
              >

                {/* reply preview */}
                {msg.replyTo && (
                  <div className="replyBox">
                    ↪ {msg.replyTo.text}
                  </div>
                )}

                {/* edit mode */}
                {editingMsg === msg.id ? (
                  <input
                    defaultValue={msg.text}
                    onBlur={(e) =>
                      saveEdit(msg.id, e.target.value)
                    }
                  />
                ) : (
                  <div>{msg.text}</div>
                )}

                <div className="msgMeta">
                  {msg.time}
                  {msg.edited && " (edited)"}
                </div>

                {/* actions */}
                <div className="actions">
                  <button onClick={() => setReply(msg)}>↩</button>
                  <button onClick={() => setEditingMsg(msg.id)}>✏</button>
                  <button onClick={() => deleteMessage(msg.id)}>🗑</button>
                </div>

              </div>
            ))}

          </div>
        ))}

        <div ref={endRef} />
      </div>

      {/* SCROLL BUTTON */}
      {showScrollBtn && (
        <button onClick={scrollToBottom}>
          ↓
        </button>
      )}

      {/* INPUT */}
      <div className="chatInputBar">

        {replyTo && (
          <div>
            Reply: {replyTo.text}
            <button onClick={() => setReplyTo(null)}>✕</button>
          </div>
        )}

        <input
          value={text}
          onChange={(e) => handleTyping(e.target.value)}
          placeholder="Type message..."
        />

        <button onClick={send}>➤</button>

      </div>

    </div>
  );
}

export default ChatWindow;