import React, { useState } from "react";

function ContactSupport() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    alert("Support request sent!");
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Contact Support</h2>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your issue..."
        style={{ width: "100%", height: 120 }}
      />

      <button onClick={sendMessage} style={{ marginTop: 10 }}>
        Send
      </button>
    </div>
  );
}

export default ContactSupport;