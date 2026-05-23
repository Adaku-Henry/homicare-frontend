import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "./roleGuard";
import { useAuth } from "../../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin(user)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;