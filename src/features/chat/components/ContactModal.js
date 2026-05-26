import React, { useState, useMemo, useCallback } from "react";
import { useChat } from "../context/ChatContext";

const mockContacts = [
  { id: 4, name: "Jane Cleaner", phone: "0700000001", role: "Cleaner" },
  { id: 5, name: "David Electrician", phone: "0700000002", role: "Electrician" },
  { id: 6, name: "Grace Babysitter", phone: "0700000003", role: "Babysitter" },
];

// ================= ADVANCED TAG SYSTEM =================
const CONTACT_TAGS = ["work", "family", "urgent", "service", "vip"];

function ContactModal({ onClose }) {
  const { addContact, startConversation } = useChat();

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [viewMode, setViewMode] = useState("list");

  // ================= ENRICH CONTACT =================
  const enrichContact = useCallback((contact) => {
    return {
      ...contact,

      // UX metadata
      avatar: contact.name.charAt(0),
      online: Math.random() > 0.5,
      lastSeen: new Date().toLocaleTimeString(),

      // advanced metadata
      tags: [],
      notes: "",
      starred: false,
      blocked: false,
      lastContacted: null,
      messageCount: 0,
    };
  }, []);

  // ================= HANDLE SELECT =================
  const handleSelect = useCallback(
    (contact) => {
      if (blocked.includes(contact.id)) return;

      const enriched = enrichContact(contact);

      addContact(enriched);
      startConversation(enriched);

      onClose();
    },
    [addContact, startConversation, blocked, enrichContact, onClose]
  );

  // ================= TOGGLE FAVORITE =================
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // ================= BLOCK CONTACT =================
  const toggleBlock = (id) => {
    setBlocked((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // ================= MULTI SELECT =================
  const toggleSelect = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // ================= FILTER LOGIC =================
  const filtered = useMemo(() => {
    let list = [...mockContacts];

    // search
    list = list.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    // block filter
    list = list.filter((c) => !blocked.includes(c.id));

    // tag filter (future-ready)
    if (selectedTag !== "all") {
      list = list.filter((c) =>
        (c.tags || []).includes(selectedTag)
      );
    }

    // favorites first
    list.sort((a, b) => {
      const aFav = favorites.includes(a.id) ? 1 : 0;
      const bFav = favorites.includes(b.id) ? 1 : 0;
      return bFav - aFav;
    });

    return list;
  }, [search, blocked, selectedTag, favorites]);

  // ================= BULK ACTIONS =================
  const bulkAddContacts = () => {
    selectedContacts.forEach((id) => {
      const contact = mockContacts.find((c) => c.id === id);
      if (contact) handleSelect(contact);
    });

    setSelectedContacts([]);
  };

  const exportContacts = () => {
    const data = JSON.stringify(mockContacts, null, 2);

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.json";
    a.click();
  };

  // ================= RENDER =================
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        {/* HEADER */}
        <div style={styles.header}>
          <h3>Contact Manager</h3>

          <div style={styles.actions}>
            <button onClick={() => setViewMode("list")}>List</button>
            <button onClick={() => setViewMode("grid")}>Grid</button>
            <button onClick={exportContacts}>Export</button>
          </div>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        {/* TAG FILTERS */}
        <div style={styles.tags}>
          <button onClick={() => setSelectedTag("all")}>All</button>

          {CONTACT_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* BULK ACTIONS */}
        {selectedContacts.length > 0 && (
          <div style={styles.bulkBar}>
            <span>{selectedContacts.length} selected</span>
            <button onClick={bulkAddContacts}>
              Add Selected
            </button>
          </div>
        )}

        {/* CONTACT LIST */}
        <div style={styles.list}>
          {filtered.map((contact) => {
            const isFav = favorites.includes(contact.id);
            const isBlocked = blocked.includes(contact.id);
            const isSelected = selectedContacts.includes(contact.id);

            return (
              <div
                key={contact.id}
                style={{
                  ...styles.item,
                  background: isSelected ? "#f0f8ff" : "#fff",
                }}
              >

                {/* LEFT INFO */}
                <div
                  onClick={() => handleSelect(contact)}
                  style={{ flex: 1 }}
                >
                  <b>
                    {contact.name} {isFav && "⭐"}
                  </b>

                  <div style={{ fontSize: "12px", opacity: 0.7 }}>
                    {contact.role} • {contact.phone}
                  </div>
                </div>

                {/* ACTIONS */}
                <div style={styles.rightActions}>

                  <button onClick={() => toggleFavorite(contact.id)}>
                    ⭐
                  </button>

                  <button onClick={() => toggleBlock(contact.id)}>
                    🚫
                  </button>

                  <button onClick={() => toggleSelect(contact.id)}>
                    ✔
                  </button>

                </div>

              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <button onClick={onClose} style={styles.closeBtn}>
          Close
        </button>

      </div>
    </div>
  );
}

export default ContactModal;