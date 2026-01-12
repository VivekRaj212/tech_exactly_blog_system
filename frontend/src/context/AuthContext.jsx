import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("userName");

    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole);
      setUserName(storedName);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (accessToken, userRole, name) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("role", userRole);
    localStorage.setItem("userName", name);
    setToken(accessToken);
    setRole(userRole);
    setUserName(name);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    setToken(null);
    setRole(null);
    setUserName(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, role, userName, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
