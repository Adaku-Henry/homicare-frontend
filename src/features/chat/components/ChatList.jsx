import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";

import { useChat } from "../context/ChatContext";
import "./ChatList.css";

function ChatList() {
  const chat = useChat();

  // ================= CONTEXT =================
  const users = useMemo(() => chat?.users || [], [chat?.users]);

  const activeChat = chat?.activeChat;
  const selectChat = chat?.selectChat;
  const getLastMessage = chat?.getLastMessage;
  const getUnreadCount = chat?.getUnreadCount;

  // ================= STATES =================
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showTime, setShowTime] = useState(true);
  const [showAvatars, setShowAvatars] = useState(true);

  const [networkStatus, setNetworkStatus] =
    useState(navigator.onLine);

  const [voiceSearch, setVoiceSearch] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [recentSearches, setRecentSearches] =
    useState(() => {
      return JSON.parse(
        localStorage.getItem("recentSearches") ||
          "[]"
      );
    });

  // ================= STORAGE =================
  const [pinned, setPinned] = useState(() => {
    return JSON.parse(
      localStorage.getItem("pinnedChats") ||
        "[]"
    );
  });

  const [favorites, setFavorites] =
    useState(() => {
      return JSON.parse(
        localStorage.getItem(
          "favoriteChats"
        ) || "[]"
      );
    });

  const [muted, setMuted] = useState(() => {
    return JSON.parse(
      localStorage.getItem("mutedChats") ||
        "[]"
    );
  });

  const [archived, setArchived] =
    useState(() => {
      return JSON.parse(
        localStorage.getItem(
          "archivedChats"
        ) || "[]"
      );
    });

  const [blocked, setBlocked] = useState(() => {
    return JSON.parse(
      localStorage.getItem("blockedChats") ||
        "[]"
    );
  });

  const [deletedChats, setDeletedChats] =
    useState(() => {
      return JSON.parse(
        localStorage.getItem(
          "deletedChats"
        ) || "[]"
      );
    });

  // ================= REFS =================
  const searchRef = useRef(null);

  // ================= ONLINE/OFFLINE =================
  useEffect(() => {
    const online = () =>
      setNetworkStatus(true);

    const offline = () =>
      setNetworkStatus(false);

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener(
        "online",
        online
      );

      window.removeEventListener(
        "offline",
        offline
      );
    };
  }, []);

  // ================= SAVE STORAGE =================
  useEffect(() => {
    localStorage.setItem(
      "pinnedChats",
      JSON.stringify(pinned)
    );
  }, [pinned]);

  useEffect(() => {
    localStorage.setItem(
      "favoriteChats",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(
      "mutedChats",
      JSON.stringify(muted)
    );
  }, [muted]);

  useEffect(() => {
    localStorage.setItem(
      "archivedChats",
      JSON.stringify(archived)
    );
  }, [archived]);

  useEffect(() => {
    localStorage.setItem(
      "blockedChats",
      JSON.stringify(blocked)
    );
  }, [blocked]);

  useEffect(() => {
    localStorage.setItem(
      "deletedChats",
      JSON.stringify(deletedChats)
    );
  }, [deletedChats]);

  useEffect(() => {
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(recentSearches)
    );
  }, [recentSearches]);

  // ================= SHORTCUTS =================
  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key === "/") {
        searchRef.current?.focus();
      }

      if (e.key === "Escape") {
        setShowSettings(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, []);

  // ================= OPEN CHAT =================
  const openChat = useCallback(
    (id) => {
      if (selectChat) {
        selectChat(id);
      }

      if (window.innerWidth < 768) {
        setMobileOpen(false);
      }
    },
    [selectChat]
  );

  // ================= ACTIONS =================
  const togglePin = (id) => {
    setPinned((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const toggleMute = (id) => {
    setMuted((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const toggleArchive = (id) => {
    setArchived((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const toggleBlock = (id) => {
    setBlocked((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const deleteChat = (id) => {
    const confirmDelete = window.confirm(
      "Delete this conversation permanently?"
    );

    if (confirmDelete) {
      setDeletedChats((prev) => [
        ...prev,
        id,
      ]);
    }
  };

  // ================= SEARCH =================
  const clearSearch = () => {
    setSearch("");
  };

  const handleSearch = (value) => {
    setSearch(value);

    if (
      value.trim() &&
      !recentSearches.includes(value)
    ) {
      setRecentSearches((prev) => [
        value,
        ...prev.slice(0, 5),
      ]);
    }
  };

  // ================= VOICE =================
  const startVoiceSearch = () => {
    setVoiceSearch(true);

    setTimeout(() => {
      setVoiceSearch(false);
      alert("Voice search coming soon");
    }, 2000);
  };

  // ================= TOTAL UNREAD =================
  const totalUnread = useMemo(() => {
    return users.reduce((acc, user) => {
      return (
        acc +
        (getUnreadCount?.(user.id) || 0)
      );
    }, 0);
  }, [users, getUnreadCount]);

  // ================= FILTER USERS =================
  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    filtered = filtered.filter(
      (u) =>
        !deletedChats.includes(u.id) &&
        !blocked.includes(u.id)
    );

    filtered = filtered.filter((u) =>
      u.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    if (tab === "online") {
      filtered = filtered.filter(
        (u) => u.online
      );
    }

    if (tab === "favorites") {
      filtered = filtered.filter((u) =>
        favorites.includes(u.id)
      );
    }

    if (tab === "pinned") {
      filtered = filtered.filter((u) =>
        pinned.includes(u.id)
      );
    }

    if (tab === "muted") {
      filtered = filtered.filter((u) =>
        muted.includes(u.id)
      );
    }

    if (tab === "archived") {
      filtered = filtered.filter((u) =>
        archived.includes(u.id)
      );
    }

    filtered.sort((a, b) => {
      const aPinned =
        pinned.includes(a.id) ? 1 : 0;

      const bPinned =
        pinned.includes(b.id) ? 1 : 0;

      if (aPinned !== bPinned) {
        return bPinned - aPinned;
      }

      const aMsg = getLastMessage?.(a.id);
      const bMsg = getLastMessage?.(b.id);

      return (
        (bMsg?.id || 0) -
        (aMsg?.id || 0)
      );
    });

    return filtered;
  }, [
    users,
    search,
    tab,
    pinned,
    favorites,
    muted,
    archived,
    blocked,
    deletedChats,
    getLastMessage,
  ]);

  // ================= EMPTY =================
  if (!users.length) {
    return (
      <div className="chatListEmpty">
        <h2>No chats available</h2>
      </div>
    );
  }

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="mobileOverlay"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      <div
        className={`chatListContainer ${
          darkMode ? "dark" : ""
        } ${
          compactMode ? "compact" : ""
        } ${
          mobileOpen ? "mobileSidebarOpen" : ""
        }`}
      >
        {/* MOBILE TOP BAR */}
        <div className="mobileTopBar">
          <button
            className="mobileMenuBtn"
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
          >
            ☰
          </button>

          <h2>Chats</h2>

          <button
            onClick={() =>
              setShowSettings(
                !showSettings
              )
            }
          >
            ⚙
          </button>
        </div>

        {/* HEADER */}
        <div className="chatListHeader">
          <div className="headerTop">
            <h2>Messages</h2>

            <div className="headerActions">
              <button
                onClick={() =>
                  setDarkMode(
                    !darkMode
                  )
                }
              >
                {darkMode ? "☀" : "🌙"}
              </button>

              <button
                onClick={() =>
                  setCompactMode(
                    !compactMode
                  )
                }
              >
                ⬚
              </button>
            </div>
          </div>

          {/* NETWORK */}
          <div
            className={`networkStatus ${
              networkStatus
                ? "onlineNet"
                : "offlineNet"
            }`}
          >
            {networkStatus
              ? "🟢 Online"
              : "🔴 Offline"}
          </div>

          {/* SEARCH */}
          <div className="searchBox">
            <input
              ref={searchRef}
              placeholder="Search chats..."
              value={search}
              onChange={(e) =>
                handleSearch(
                  e.target.value
                )
              }
            />

            <button
              onClick={clearSearch}
            >
              ✕
            </button>

            <button
              onClick={
                startVoiceSearch
              }
            >
              {voiceSearch
                ? "🎙..."
                : "🎤"}
            </button>
          </div>

          {/* RECENT SEARCHES */}
          {recentSearches.length >
            0 && (
            <div className="recentSearches">
              {recentSearches.map(
                (item, index) => (
                  <span
                    key={index}
                    onClick={() =>
                      setSearch(item)
                    }
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          )}

          {/* TABS */}
          <div className="tabs">
            <button
              onClick={() =>
                setTab("all")
              }
            >
              All
            </button>

            <button
              onClick={() =>
                setTab("online")
              }
            >
              Online
            </button>

            <button
              onClick={() =>
                setTab(
                  "favorites"
                )
              }
            >
              Favorites
            </button>

            <button
              onClick={() =>
                setTab("pinned")
              }
            >
              Pinned
            </button>

            <button
              onClick={() =>
                setTab("muted")
              }
            >
              Muted
            </button>

            <button
              onClick={() =>
                setTab(
                  "archived"
                )
              }
            >
              Archived
            </button>
          </div>
        </div>

        {/* SETTINGS */}
        {showSettings && (
          <div className="settingsPanel">
            <h3>Settings</h3>

            <label>
              <input
                type="checkbox"
                checked={
                  showAvatars
                }
                onChange={() =>
                  setShowAvatars(
                    !showAvatars
                  )
                }
              />
              Show avatars
            </label>

            <label>
              <input
                type="checkbox"
                checked={
                  showPreview
                }
                onChange={() =>
                  setShowPreview(
                    !showPreview
                  )
                }
              />
              Show preview
            </label>

            <label>
              <input
                type="checkbox"
                checked={showTime}
                onChange={() =>
                  setShowTime(
                    !showTime
                  )
                }
              />
              Show time
            </label>
          </div>
        )}

        {/* NOTIFICATION */}
        <div className="notificationBar">
          <span>
            Total unread:{" "}
            {totalUnread}
          </span>

          <button
            onClick={() =>
              window.location.reload()
            }
          >
            Refresh
          </button>
        </div>

        {/* CHAT LIST */}
        <div className="chatList">
          {filteredUsers.length ===
            0 && (
            <div className="emptyChats">
              No chats found
            </div>
          )}

          {filteredUsers.map((user) => {
            const lastMsg =
              getLastMessage?.(
                user.id
              );

            const unread =
              getUnreadCount?.(
                user.id
              ) || 0;

            return (
              <div
                key={user.id}
                className={`chatItem ${
                  activeChat ===
                  user.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  openChat(user.id)
                }
              >
                {/* AVATAR */}
                {showAvatars && (
                  <div className="avatar">
                    {user.avatar ? (
                      <img
                        src={
                          user.avatar
                        }
                        alt={
                          user.name
                        }
                      />
                    ) : (
                      user.name?.charAt(
                        0
                      )
                    )}

                    {user.online && (
                      <span className="onlineDot" />
                    )}
                  </div>
                )}

                {/* INFO */}
                <div className="chatInfo">
                  <div className="topRow">
                    <div className="nameRow">
                      <span className="name">
                        {user.name}
                      </span>

                      {pinned.includes(
                        user.id
                      ) && (
                        <span>
                          📌
                        </span>
                      )}

                      {favorites.includes(
                        user.id
                      ) && (
                        <span>
                          ⭐
                        </span>
                      )}

                      {muted.includes(
                        user.id
                      ) && (
                        <span>
                          🔕
                        </span>
                      )}
                    </div>

                    {showTime && (
                      <span className="time">
                        {lastMsg?.time ||
                          "now"}
                      </span>
                    )}
                  </div>

                  {showPreview && (
                    <div className="bottomRow">
                      <span className="message">
                        {lastMsg?.text ||
                          "No messages yet"}
                      </span>

                      {unread >
                        0 && (
                        <span className="unread">
                          {unread}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(
                        user.id
                      );
                    }}
                  >
                    📌
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(
                        user.id
                      );
                    }}
                  >
                    ⭐
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute(
                        user.id
                      );
                    }}
                  >
                    🔕
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleArchive(
                        user.id
                      );
                    }}
                  >
                    📦
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBlock(
                        user.id
                      );
                    }}
                  >
                    🚫
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(
                        user.id
                      );
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
    </>
  );
}

export default ChatList;