import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App";

// ✅ ADD THIS
import AppProviders from "./context/AppProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppProviders>
      <AppWrapper />
    </AppProviders>
  </React.StrictMode>
);