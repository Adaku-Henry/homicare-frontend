import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

const mockContacts = [
  { id: 4, name: "Jane Cleaner" },
  { id: 5, name: "David Electrician" },
  { id: 6, name: "Grace Babysitter" },
];

function ContactModal({ onClose }) {
  const { addContact } = useChat();
  const [search, setSearch] = useState("");

  const filtered = mockContacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        <h3>Select Contact</h3>

        {/* SEARCH */}
        <input
          placeholder="Search contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        {/* CONTACT LIST */}
        <div style={styles.list}>
          {filtered.map((contact) => (
            <div
              key={contact.id}
              style={styles.item}
              onClick={() => {
                addContact(contact);
                onClose();
              }}
            >
              {contact.name}
            </div>
          ))}
        </div>

        <button onClick={onClose} style={styles.closeBtn}>
          Close
        </button>

      </div>
    </div>
  );
}

export default ContactModal;

// ================= STYLES =================
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    width: "300px",
    borderRadius: "10px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  list: {
    maxHeight: "200px",
    overflowY: "auto",
  },
  item: {
    padding: "10px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },
  closeBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "8px",
  },
};