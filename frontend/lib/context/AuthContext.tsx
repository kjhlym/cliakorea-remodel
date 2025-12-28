"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const savedToken = Cookies.get("auth_token");
    if (savedToken) {
      setToken(savedToken);
      fetchUserProfile(savedToken);
    }
  }, []);

  const fetchUserProfile = async (authToken: string) => {
    try {
      const rawUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = (rawUrl && rawUrl !== "undefined") ? rawUrl : "http://localhost:3001";
      console.log('[AuthContext] Fetching user profile from:', `${apiUrl}/auth/me`);
      console.log('[AuthContext] Token:', authToken.substring(0, 20) + '...');
      
      const response = await fetch(`${apiUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      console.log('[AuthContext] Response status:', response.status);
      
      if (response.ok) {
        const userData = await response.json();
        console.log('[AuthContext] User data received:', userData);
        setUser(userData);
      } else {
        const errorText = await response.text();
        console.error('[AuthContext] Failed to fetch profile:', response.status, errorText);
        logout();
      }
    } catch (error) {
      console.error("[AuthContext] Failed to fetch user profile", error);
      logout();
    }
  };

  const login = async (newToken: string) => {
    console.log('[AuthContext] login() called with token');
    Cookies.set("auth_token", newToken, { expires: 7 });
    setToken(newToken);
    await fetchUserProfile(newToken);
    setIsLoginModalOpen(false);
    console.log('[AuthContext] login() completed');
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
