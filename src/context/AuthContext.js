import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // ================= INIT =================
  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      const savedToken = localStorage.getItem("token");

      if (savedUser && savedToken) {
        setUser(savedUser);
        setToken(savedToken);
      }
    } catch (err) {
      console.log("Restore error:", err);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
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

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      localStorage.setItem("token", data.access);
      setToken(data.access);

      // GET PROFILE
      const profileRes = await fetch("http://localhost:8000/api/profile/", {
        headers: { Authorization: `Bearer ${data.access}` },
      });

      let profile = await profileRes.json();

      // 🔥 FALLBACK if backend fails
      if (!profile || profile.error) {
        profile = createDefaultUser(email);
      }

      localStorage.setItem("user", JSON.stringify(profile));
      setUser(profile);

      return { success: true, role: profile.role };

    } catch (err) {
      console.warn("Login fallback activated");

      const fakeUser = createDefaultUser(email);

      localStorage.setItem("user", JSON.stringify(fakeUser));
      localStorage.setItem("token", "temp-token");

      setUser(fakeUser);
      setToken("temp-token");

      return { success: true, role: "provider" };
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
    } catch (err) {
      console.warn("Register fallback");
    }

    // 🔥 CREATE FULL USER PROFILE
    const newUser = {
      id: Date.now(),
      name: fullName,
      email,
      phone,
      role: "provider",

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
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", "temp-token");

    setUser(newUser);
    setToken("temp-token");

    return { success: true };
  };

  // ================= UPDATE PROFILE =================
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    window.location.href = "/login";
  };

  // ================= DEFAULT USER =================
  const createDefaultUser = (email) => ({
    id: Date.now(),
    name: email,
    email,
    role: "provider",
    skills: [],
    experience: [],
    education: [],
    available: true,
  });

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
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};