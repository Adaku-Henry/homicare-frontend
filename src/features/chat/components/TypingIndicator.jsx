import React from "react";

function TypingIndicator({ user }) {
  return (
    <div style={styles.wrapper}>
      {user?.name} is typing...
    </div>
  );
}

export default TypingIndicator;

const styles = {
  wrapper: {
    fontSize: "12px",
    color: "#666",
    padding: "5px 10px",
  },
};