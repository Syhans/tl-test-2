"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const SpoilerContext = createContext<boolean | null>(null);
export const SpoilerConfirmContext = createContext<(() => void) | null>(null);

export function SpoilerProvider({ children }: { children: React.ReactNode }) {
  const [isSpoilerOk, setIsSpoilerOk] = useState(true);
  const confirmSpoilerIsOk = () => {
    setIsSpoilerOk(true);
    localStorage.setItem("spoilersOk", "true");
  };
  // read spoiler state from local storage
  useEffect(() => {
    const spoilersOk = localStorage.getItem("spoilersOk");
    if (!spoilersOk) {
      setIsSpoilerOk(false);
    }
  }, []);

  return (
    <SpoilerContext.Provider value={isSpoilerOk}>
      <SpoilerConfirmContext.Provider value={confirmSpoilerIsOk}>
        {children}
      </SpoilerConfirmContext.Provider>
    </SpoilerContext.Provider>
  );
}

export function useSpoiler() {
  const context = useContext(SpoilerContext);
  if (context === null) {
    throw new Error("useSpoiler must be used within a SpoilerProvider");
  }
  return context;
}

export function useSpoilerConfirm() {
  const context = useContext(SpoilerConfirmContext);
  if (context === null) {
    throw new Error("useSpoilerConfirm must be used within a SpoilerProvider");
  }
  return context;
}
