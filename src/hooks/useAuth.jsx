import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AUTH_KEY = "homicare_auth_user";

// ================= DEFAULT USER =================
const defaultUser = {
  id: null,
  fullName: "",
  email: "",
  phone: "",
  role: "customer",
  avatar: "",
};

// ================= PROVIDER =================
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);

  // LOAD USER FROM LOCAL STORAGE
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Auth load error:", err);
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = (userData) => {
    const newUser = {
      ...defaultUser,
      ...userData,
      id: userData.id || Date.now(),
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  // REGISTER
  const register = (userData) => {
    const newUser = {
      ...defaultUser,
      ...userData,
      id: Date.now(),
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(defaultUser);
  };

  // UPDATE USER
  const updateUser = (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user?.id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ================= HOOK =================
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export default useAuth;