// src/components/Other/authContext/authContext.tsx

import React, { useEffect, useState } from "react";
import { AuthState } from "../../../interfaces/Main";
import { AuthContext } from "./AuthContext";




const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false, username: "" });
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedIsAdmin = localStorage.getItem("isAdmin") === 'true';

    if (storedToken && storedUsername) {
      setAuthState({ isAuthenticated: true, username: storedUsername });
      setToken(storedToken);
      setIsAdmin(storedIsAdmin);
    }

    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  const login = (username: string, token: string, isAdmin: boolean) => {
    setAuthState({ isAuthenticated: true, username });
    setToken(token);
    setIsAdmin(isAdmin);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("isAdmin", isAdmin.toString());
    setIsLoading(false);
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, username: "" });
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ authState, token, isLoading, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// Экспортируем по умолчанию объект с необходимыми экспортами
export default AuthProvider;