import React, { useState, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import "./UserSearch.css";

const mockUsers = [
  { id: 1, name: "John Cleaner", role: "Cleaner" },
  { id: 2, name: "Sarah Electrician", role: "Electrician" },
  { id: 3, name: "Plumber Pro", role: "Plumber" },
  { id: 4, name: "Laundry Expert", role: "Laundry" },
  { id: 5, name: "Babysitter Mary", role: "Child Care" },
];

const UserSearch = () => {
  const { selectChat } = useChat(); // ✅ FIXED HERE

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= SEARCH LOGIC =================
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const filtered = mockUsers.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filtered);
      setLoading(false);
    }, 400);
  }, [query]);

  // ================= START CHAT =================
  const handleStartChat = (user) => {
    selectChat(user.id); // ✅ FIXED (open chat directly)
  };

  return (
    <div className="user-search-container">

      <h2>🔍 Start a Conversation</h2>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search users or providers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {/* LOADING */}
      {loading && <p className="loading">Searching...</p>}

      {/* RESULTS */}
      <div className="results">

        {results.length === 0 && query && !loading && (
          <p className="no-results">No users found</p>
        )}

        {results.map((user) => (
          <div key={user.id} className="user-card">

            <div>
              <strong>{user.name}</strong>
              <p>{user.role}</p>
            </div>

            <button onClick={() => handleStartChat(user)}>
              Chat
            </button>

          </div>
        ))}

      </div>
    </div>
  );
};

export default UserSearch;