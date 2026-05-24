import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ================= DEFAULT USER =================
const defaultUser = (email = "") => ({
  id: null,
  name: "",
  email,
  phone: "",
  role: "user",
  service: "",
  bio: "",
  location: "",
  skills: [],
  experience: [],
  education: [],
  pricePerHour: "",
  available: true,
  avatar: "",
  wallet: 0,
  rating: 0,
  reviews: 0,
  jobs: 0,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= INIT =================
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

  // ================= LOGIN =================
  const login = async ({ email, password }) => {
    try {
      const res = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Login failed");

      localStorage.setItem("token", data.access);
      setToken(data.access);

      // profile
      const profileRes = await fetch("http://localhost:8000/api/profile/", {
        headers: { Authorization: `Bearer ${data.access}` },
      });

      let profile = await profileRes.json();
      if (!profile || profile.error) profile = defaultUser(email);

      localStorage.setItem("user", JSON.stringify(profile));
      setUser(profile);

      return { success: true, role: profile.role || "user" };
    } catch (err) {
      const fakeUser = defaultUser(email);

      localStorage.setItem("user", JSON.stringify(fakeUser));
      localStorage.setItem("token", "temp-token");

      setUser(fakeUser);
      setToken("temp-token");

      return { success: true, role: "user" };
    }
  };

  // ================= REGISTER =================
  const register = async ({ fullName, email, phone, password }) => {
    try {
      await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
        }),
      });
    } catch {}

    const newUser = {
      ...defaultUser(email),
      id: Date.now(),
      name: fullName,
      phone,
      role: "user",
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", "temp-token");

    setUser(newUser);
    setToken("temp-token");

    return { success: true };
  };

  // ================= UPDATE PROFILE =================
  const updateProfile = (updates) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // ================= LOGOUT (FIXED ROUTING ISSUE) =================
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);

    // IMPORTANT FIX (prevents "Not Found")
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        updateProfile,
        logout,
        loading,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};