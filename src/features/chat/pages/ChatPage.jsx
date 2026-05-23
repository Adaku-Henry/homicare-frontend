import React from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import UserSearch from "../components/UserSearch"; // ✅ FIXED PATH

function ChatPage() {
  return (
    <div style={styles.container}>

      {/* LEFT PANEL */}
      <div style={styles.leftPanel}>

        {/* 🔍 SEARCH USERS */}
        <div style={styles.searchBox}>
          <UserSearch />
        </div>

        {/* 💬 CHAT LIST */}
        <ChatList />

      </div>

      {/* RIGHT PANEL */}
      <div style={styles.rightPanel}>
        <ChatWindow />
      </div>

    </div>
  );
}

export default ChatPage;

// ================= STYLES =================
const styles = {
  container: {
    display: "flex",
    height: "80vh",
    backgroundColor: "#f5f7fb",
    overflow: "hidden",
  },

  leftPanel: {
    width: "30%",
    minWidth: "250px", // 🔥 increased for better UI
    maxWidth: "350px",
    borderRight: "1px solid #e6e6e6",
    backgroundColor: "#0f172a", // 🔥 modern dark panel
    display: "flex",
    flexDirection: "column",
  },

  searchBox: {
    padding: "10px",
    borderBottom: "1px solid #1e293b",
  },

  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f9fafc",
  },
};