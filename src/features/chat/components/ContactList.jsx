import React, { useState, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import "./ContactList.css";

function ContactList() {
  const { selectChat, activeChat } = useChat();

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("homi_contacts");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [open, setOpen] = useState(false);

  // ================= SAVE TO STORAGE =================
  useEffect(() => {
    localStorage.setItem("homi_contacts", JSON.stringify(contacts));
  }, [contacts]);

  // ================= ADD CONTACT =================
  const addContact = () => {
    if (!form.name || !form.phone) return;

    const newContact = {
      id: Date.now(),
      ...form,
    };

    setContacts((prev) => [newContact, ...prev]);

    setForm({
      name: "",
      phone: "",
      email: "",
    });

    setOpen(false);
  };

  // ================= OPEN CHAT =================
  const openChat = (contact) => {
    selectChat(contact.id);
  };

  return (
    <div className="contactContainer">

      {/* HEADER */}
      <div className="contactHeader">
        <h3>Contacts</h3>

        <button onClick={() => setOpen(true)}>
          + Add
        </button>
      </div>

      {/* ADD FORM */}
      {open && (
        <div className="contactForm">
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

          <button onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
      )}

      {/* CONTACT LIST */}
      <div className="contactList">
        {contacts.length === 0 && (
          <p className="emptyText">
            No contacts yet
          </p>
        )}

        {contacts.map((c) => (
          <div
            key={c.id}
            className={`contactCard ${
              activeChat === c.id ? "active" : ""
            }`}
            onClick={() => openChat(c)}
          >
            {/* AVATAR */}
            <div className="avatar">
              {c.name?.charAt(0)}
            </div>

            {/* INFO */}
            <div className="info">
              <div className="name">{c.name}</div>
              <div className="phone">{c.phone}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ContactList;