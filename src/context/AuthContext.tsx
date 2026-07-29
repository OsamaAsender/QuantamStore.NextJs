"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";
import { API_ENDPOINTS } from "@/config/api";

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
  [key: string]: unknown;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: (updated: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = async () => {
    try {
      const data = await apiRequest<User>(API_ENDPOINTS.AUTH_ME);
      setUser(data);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async () => fetchUser(); // reuse the same fetch

  const logout = async () => {
    await apiRequest(API_ENDPOINTS.AUTH_LOGOUT, { method: "POST" });
    setUser(null);
    setIsAuthenticated(false);
  };

  /* ---------- NEW ---------- */
  const refreshUser = (updated: Partial<User>) =>
    setUser((prev) => (prev ? { ...prev, ...updated } : null));

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
