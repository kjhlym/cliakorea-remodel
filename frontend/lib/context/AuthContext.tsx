"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  role: string;
  totalCredits?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = Cookies.get("auth_token");
      if (savedToken) {
        setToken(savedToken);
        await fetchUserProfile(savedToken);
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const fetchUserProfile = async (authToken: string) => {
    try {
      const rawUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = (rawUrl && rawUrl !== "undefined") ? rawUrl : "http://localhost:3001";
      
      const response = await fetch(`${apiUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        logout();
      }
    } catch (error) {
      console.error("[AuthContext] Failed to fetch user profile", error);
      logout();
    }
  };

  const login = async (newToken: string) => {
    Cookies.set("auth_token", newToken, { expires: 7 });
    setToken(newToken);
    await fetchUserProfile(newToken);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    Cookies.remove("auth_token");
    setToken(null);
    setUser(null);
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
