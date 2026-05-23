import { createContext, useState, useEffect } from "react";
import { getMe } from "../api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 NEW

  const loadUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false); // 🔥 NEW (important)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      loadUser(); // only try if token exists
    } else {
      setLoading(false); // no token → skip API call
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loadUser,
        loading, // 🔥 NEW exposed to app
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// This page keeps the user logged in across pages