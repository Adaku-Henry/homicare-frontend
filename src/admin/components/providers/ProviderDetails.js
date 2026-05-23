import React from "react";

export default function ProviderDetails({ provider, onClose }) {
  if (!provider) return null;

  return (
    <div style={{
      position: "fixed",
      right: 0,
      top: 0,
      width: 350,
      height: "100%",
      background: "#fff",
      padding: 20
    }}>
      <h3>Provider Details</h3>

      <p><b>Name:</b> {provider.name}</p>
      <p><b>Category:</b> {provider.category}</p>
      <p><b>Rating:</b> {provider.rating}</p>
      <p><b>Jobs:</b> {provider.jobs}</p>
      <p><b>Status:</b> {provider.status}</p>
      <p><b>Verified:</b> {provider.verified ? "Yes" : "No"}</p>

      <h4>Documents</h4>
      <p>ID Card: {provider.documents.idCard ? "✅" : "❌"}</p>
      <p>Certificate: {provider.documents.certificate ? "✅" : "❌"}</p>

      <br />
      <button onClick={onClose}>Close</button>
    </div>
  );
}