import React, { useState } from "react";
import "./ChatWindow.css";

function ContactDrawer({ onAddContact, contacts = [] }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const add = () => {
    if (!form.name || !form.phone) return;

    onAddContact(form);

    setForm({ name: "", phone: "", email: "" });
    setOpen(false);
  };

  return (
    <>
      {/* FLOATING BUTTON (mobile friendly) */}
      <button
        className="fabBtn"
        onClick={() => setOpen(true)}
      >
        +
      </button>

      {/* OVERLAY */}
      {open && (
        <div className="drawerOverlay" onClick={() => setOpen(false)}>
          <div
            className="drawerPanel"
            onClick={(e) => e.stopPropagation()}
          >
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

            <button onClick={add}>Save Contact</button>
            <button onClick={() => setOpen(false)}>Close</button>

            <div className="contactList">
              {contacts.map((c) => (
                <div key={c.id} className="contactCard">
                  <b>{c.name}</b>
                  <small>{c.phone}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactDrawer;