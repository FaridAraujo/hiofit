"use client";

import { createContext, useContext, useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string | null;
  hasPlan: boolean;
  login: (name?: string) => void;
  logout: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userName: null,
  hasPlan: false,
  login: () => {},
  logout: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName,   setUserName]   = useState<string | null>(null);
  const [hasPlan,    setHasPlan]    = useState(false);

  useEffect(() => {
    try {
      const session = localStorage.getItem("hiofit_session");
      if (session) {
        const parsed = JSON.parse(session);
        setIsLoggedIn(true);
        setUserName(parsed.name ?? null);
        setHasPlan(parsed.hasPlan ?? false);
      }
    } catch {
      localStorage.removeItem("hiofit_session");
    }
  }, []);

  function login(name?: string) {
    // hasPlan: false por defecto — en Phase 2 viene del backend
    const session = { name: name ?? "Usuario", hasPlan: false };
    localStorage.setItem("hiofit_session", JSON.stringify(session));
    setIsLoggedIn(true);
    setUserName(session.name);
    setHasPlan(false);
  }

  function logout() {
    localStorage.removeItem("hiofit_session");
    setIsLoggedIn(false);
    setUserName(null);
    setHasPlan(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, hasPlan, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = () => useContext(AuthContext);
