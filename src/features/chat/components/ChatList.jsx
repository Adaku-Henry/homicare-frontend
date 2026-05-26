import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useChat } from "../context/ChatContext";
import "./ChatList.css";

function ChatList() {
  const chat = useChat();

  const users = chat?.users || [];
  const activeChat = chat?.activeChat;

  // 🔥 FIX: stabilize functions from context
  const selectChat = chat?.selectChat;
  const getLastMessage = chat?.getLastMessage;
  const getUnreadCount = chat?.getUnreadCount;

  // ================= UI STATES =================
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const [pinned, setPinned] = useState(() => {
    return JSON.parse(localStorage.getItem("pinnedChats") || "[]");
  });

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favChats") || "[]");
  });

  // ================= LOCAL STORAGE =================
  useEffect(() => {
    localStorage.setItem("pinnedChats", JSON.stringify(pinned));
  }, [pinned]);

  useEffect(() => {
    localStorage.setItem("favChats", JSON.stringify(favorites));
  }, [favorites]);

  // ================= ACTIONS =================
  const togglePin = useCallback((id) => {
    setPinned((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const toggleFav = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const deleteChat = useCallback((id) => {
    alert("Delete feature will connect to backend later");
  }, []);

  // ================= OPEN CHAT =================
  const openChat = useCallback(
    (id) => {
      if (selectChat) selectChat(id);
    },
    [selectChat]
  );

  // ================= FILTER + SORT =================
  const filteredUsers = useMemo(() => {
    return users
      .filter((u) =>
        u.name?.toLowerCase().includes(search.toLowerCase())
      )
      .filter((u) => {
        if (tab === "all") return true;
        if (tab === "unread") return (getUnreadCount?.(u.id) || 0) > 0;
        if (tab === "online") return u.online;
        if (tab === "fav") return favorites.includes(u.id);
        return true;
      })
      .sort((a, b) => {
        const aPinned = pinned.includes(a.id) ? 1 : 0;
        const bPinned = pinned.includes(b.id) ? 1 : 0;

        if (aPinned !== bPinned) return bPinned - aPinned;

        const aMsg = getLastMessage?.(a.id);
        const bMsg = getLastMessage?.(b.id);

        const aTime = aMsg?.id || 0;
        const bTime = bMsg?.id || 0;

        return bTime - aTime;
      });
  }, [
    users,
    search,
    tab,
    favorites,
    pinned,
    getLastMessage,
    getUnreadCount,
  ]);

  return (
    <div className="chatListContainer">

      {/* HEADER */}
      <div className="chatListHeader">
        <h3>Messages</h3>

        <input
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="tabs">
          <button onClick={() => setTab("all")}>All</button>
          <button onClick={() => setTab("unread")}>Unread</button>
          <button onClick={() => setTab("online")}>Online</button>
          <button onClick={() => setTab("fav")}>Favorites</button>
        </div>
      </div>

      {/* LIST */}
      <div className="chatList">
        {filteredUsers.length === 0 && (
          <div className="emptyState">No chats found</div>
        )}

        {filteredUsers.map((user) => {
          const lastMsg = getLastMessage?.(user.id);
          const unread = getUnreadCount?.(user.id) || 0;

          return (
            <div
              key={user.id}
              className={`chatItem ${
                activeChat === user.id ? "active" : ""
              } ${pinned.includes(user.id) ? "pinned" : ""}`}
              onClick={() => openChat(user.id)}
            >
              {/* AVATAR */}
              <div className="avatar">
                {user.name?.charAt(0)}
                {user.online && <span className="onlineDot" />}
              </div>

              {/* INFO */}
              <div className="chatInfo">
                <div className="topRow">
                  <span className="name">
                    {user.name}
                    {favorites.includes(user.id) && " ⭐"}
                  </span>

                  <span className="time">
                    {lastMsg?.time || "just now"}
                  </span>
                </div>

                <div className="bottomRow">
                  <span className="message">
                    {lastMsg?.text || "No messages yet"}
                  </span>

                  {unread > 0 && (
                    <span className="unread">{unread}</span>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(user.id);
                  }}
                >
                  📌
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFav(user.id);
                  }}
                >
                  ⭐
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(user.id);
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatList;