import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  // ================= NOT LOGGED IN =================
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ================= ROLE CHECK =================
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}