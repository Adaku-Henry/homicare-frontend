import React, { useState } from "react";

function ContactDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`drawer ${open ? "open" : ""}`}>

      <button onClick={() => setOpen(!open)}>
        Contacts
      </button>

    </div>
  );
}

export default ContactDrawer;