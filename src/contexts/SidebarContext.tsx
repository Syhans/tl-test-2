"use client";

import { createContext, useContext, useState } from "react";

export const SidebarContext = createContext<boolean | null>(null);
export const SidebarToggleContext = createContext<(() => void) | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={isOpen}>
      <SidebarToggleContext.Provider value={toggle}>
        {children}
      </SidebarToggleContext.Provider>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === null) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function useSidebarToggle() {
  const context = useContext(SidebarToggleContext);
  if (context === null) {
    throw new Error("useSidebarToggle must be used within a SidebarProvider");
  }
  return context;
}
