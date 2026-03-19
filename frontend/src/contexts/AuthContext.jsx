import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    const authData = localStorage.getItem("herbalGardenAuth");
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed.token && parsed.user) {
          setUser(parsed.user);
          setIsLoggedIn(true);
        }
      } catch (e) {
        localStorage.removeItem("herbalGardenAuth");
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((token, userData) => {
    const authData = { token, user: userData };
    localStorage.setItem("herbalGardenAuth", JSON.stringify(authData));
    setUser(userData);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("herbalGardenAuth");
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
