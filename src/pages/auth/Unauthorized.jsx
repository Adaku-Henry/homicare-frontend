import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>🚫 Unauthorized</h1>
      <p>You do not have access to this page.</p>

      <Link to="/">Go Home</Link>
    </div>
  );
}