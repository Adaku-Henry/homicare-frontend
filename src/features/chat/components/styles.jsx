const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#f9f9f9",
  },

  empty: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    color: "#777",
    fontSize: "16px",
  },

  header: {
    padding: "12px",
    fontWeight: "bold",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
  },

  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  message: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  mediaBox: {
    marginTop: "5px",
  },

  image: {
    width: "200px",
    borderRadius: "8px",
  },

  video: {
    width: "220px",
    borderRadius: "8px",
  },

  time: {
    fontSize: "10px",
    marginTop: "5px",
    opacity: 0.6,
  },

  preview: {
    padding: "10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: "12px",
  },

  inputArea: {
    display: "flex",
    padding: "10px",
    gap: "8px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
  },

  attachBtn: {
    padding: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#eee",
    borderRadius: "6px",
  },

  sendBtn: {
    padding: "10px 14px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "6px",
  },
};
