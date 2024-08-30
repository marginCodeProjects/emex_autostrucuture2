// src/components/Other/authContext/authContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState } from "../../../interfaces/Main";

interface AuthContextType {
  authState: AuthState;
  token: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (username: string, token: string, isAdmin: boolean) => void; // Исправленный порядок
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};