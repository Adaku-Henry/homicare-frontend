import React from "react";

function MessageBubble({ msg }) {
  const isMe = msg.sender === "me";

  return (
    <div
      style={{
        ...styles.container,
        alignSelf: isMe ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          ...styles.bubble,
          background: isMe ? "#DCF8C6" : "#fff",
        }}

      >
        <div className="reactions">
  {msg.reactions?.map((r, i) => (
    <span key={i}>{r}</span>
  ))}
</div>
const [replyTo, setReplyTo] = useState(null);
        {/* TEXT */}
        {msg.type !== "file" && <div>{msg.text}</div>}

        {/* FILE PREVIEW */}
        {msg.type === "file" && (
          <div>
            <div>📄 {msg.fileName}</div>

            {/* IMAGE */}
            {msg.fileType.startsWith("image") && (
              <img
                src={msg.fileURL}
                alt="file"
                style={{ width: "150px", marginTop: "5px" }}
              />
            )}

            {/* VIDEO */}
            {msg.fileType.startsWith("video") && (
              <video
                src={msg.fileURL}
                controls
                style={{ width: "200px", marginTop: "5px" }}
              />
            )}

            {/* DOWNLOAD */}
            <a href={msg.fileURL} download={msg.fileName}>
              Download
            </a>
          </div>
        )}

        <div style={styles.time}>{msg.time}</div>
      </div>
    </div>
  );
}

export default MessageBubble;

const styles = {
  container: {
    display: "flex",
    margin: "5px 0",
  },
  bubble: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "60%",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  time: {
    fontSize: "10px",
    color: "#999",
    marginTop: "5px",
    textAlign: "right",
  },
};