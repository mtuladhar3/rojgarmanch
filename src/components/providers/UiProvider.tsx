"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type UiState = {
  menuOpen: boolean; searchOpen: boolean; notifyOpen: boolean;
  toggleMenu: () => void; toggleSearch: () => void; toggleNotify: () => void;
  closeMenu: () => void; closeSearch: () => void; closeNotify: () => void;
};
const UiContext = createContext<UiState | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const closeSearch = () => setSearchOpen(false);
  const closeNotify = () => setNotifyOpen(false);
  const toggleMenu = () => { setMenuOpen((open) => !open); setSearchOpen(false); setNotifyOpen(false); };
  const toggleSearch = () => { setSearchOpen((open) => !open); setMenuOpen(false); setNotifyOpen(false); };
  const toggleNotify = () => { setNotifyOpen((open) => !open); setMenuOpen(false); setSearchOpen(false); };
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { closeSearch(); closeNotify(); closeMenu(); }
      if (event.key === "/" && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) { event.preventDefault(); setSearchOpen(true); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return <UiContext.Provider value={{ menuOpen, searchOpen, notifyOpen, toggleMenu, toggleSearch, toggleNotify, closeMenu, closeSearch, closeNotify }}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);
  if (!context) throw new Error("useUi must be used within UiProvider");
  return context;
}
